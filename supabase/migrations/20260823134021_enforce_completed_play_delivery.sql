BEGIN;

-- A play must reach the completion threshold before it can consume campaign
-- delivery. Derive completion from trusted wall-clock elapsed time as well as
-- the tablet's observed duration, then cap accepted delivery at the creative's
-- trusted duration. This keeps retries idempotent while preventing interrupted
-- or exaggerated submissions from reducing an advertiser's minute balance.
CREATE OR REPLACE FUNCTION public.set_counted_minutes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  trusted_duration_seconds numeric;
  elapsed_seconds numeric;
  accepted_seconds numeric;
BEGIN
  trusted_duration_seconds := NEW.declared_duration_seconds;

  IF (trusted_duration_seconds IS NULL OR trusted_duration_seconds <= 0)
    AND NEW.deployment_id IS NOT NULL
  THEN
    SELECT deployment.duration_seconds
    INTO trusted_duration_seconds
    FROM public.deployments AS deployment
    WHERE deployment.id = NEW.deployment_id;

    IF trusted_duration_seconds IS NOT NULL
      AND trusted_duration_seconds > 0
    THEN
      NEW.declared_duration_seconds := trusted_duration_seconds;
    END IF;
  END IF;

  NEW.gps_valid := (
    NEW.gps_lat IS NOT NULL
    AND NEW.gps_lng IS NOT NULL
    AND NEW.gps_lat BETWEEN -90 AND 90
    AND NEW.gps_lng BETWEEN -180 AND 180
    AND NEW.gps_accuracy_metres IS NOT NULL
    AND NEW.gps_accuracy_metres BETWEEN 0 AND 100
    AND NEW.gps_recorded_at IS NOT NULL
    AND COALESCE(NEW.ended_at, NEW.started_at) IS NOT NULL
    AND NEW.gps_recorded_at >=
      COALESCE(NEW.ended_at, NEW.started_at) - make_interval(mins => 2)
    AND NEW.gps_recorded_at <=
      COALESCE(NEW.ended_at, NEW.started_at) + make_interval(secs => 30)
  );

  IF NEW.started_at IS NOT NULL
    AND NEW.ended_at IS NOT NULL
    AND NEW.ended_at >= NEW.started_at
  THEN
    elapsed_seconds := GREATEST(
      EXTRACT(EPOCH FROM (NEW.ended_at - NEW.started_at)),
      0
    );
  ELSE
    elapsed_seconds := NULL;
  END IF;

  IF NEW.duration_played_seconds IS NOT NULL
    AND NEW.duration_played_seconds >= 0
    AND trusted_duration_seconds IS NOT NULL
    AND trusted_duration_seconds > 0
    AND elapsed_seconds IS NOT NULL
  THEN
    accepted_seconds := LEAST(
      NEW.duration_played_seconds,
      trusted_duration_seconds,
      elapsed_seconds
    );
    NEW.completion_rate := LEAST(
      ROUND((accepted_seconds / trusted_duration_seconds)::numeric, 3),
      1
    );
  ELSE
    accepted_seconds := NULL;
    NEW.completion_rate := NULL;
  END IF;

  IF COALESCE(NEW.screen_state, 'playing') <> 'playing'
    OR NOT NEW.gps_valid
    OR accepted_seconds IS NULL
    OR accepted_seconds <= 0
    OR NEW.completion_rate IS NULL
    OR NEW.completion_rate < 0.8
  THEN
    NEW.counted_minutes := 0;
  ELSE
    NEW.counted_minutes := ROUND((accepted_seconds / 60.0)::numeric, 4);
  END IF;

  RETURN NEW;
END;
$function$;

COMMENT ON FUNCTION public.set_counted_minutes() IS
  'Calculates GPS-valid accepted delivery from trusted duration and wall-clock elapsed time; plays below 80% completion consume zero campaign minutes.';

NOTIFY pgrst, 'reload schema';

COMMIT;
