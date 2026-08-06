export type ActMotion = {
  progress: number;
  enter: number;
  handoff: number;
  exit: number;
  settled: number;
};

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

export function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

/*
 * Shared homepage act choreography.
 *
 * 0.00 → 0.18   Act enters from below.
 * 0.18 → 0.76   Content remains fully established.
 * 0.76 → 0.90   Current scene moves upward while its conclusion enters.
 * 0.90 → 1.00   Completed state remains held.
 */
export function createActMotion(progress: number): ActMotion {
  const safeProgress = clamp(progress);

  const enter = easeOutCubic(range(safeProgress, 0.03, 0.18));
  const handoff = easeInOutCubic(range(safeProgress, 0.76, 0.9));
  const settled = easeOutCubic(range(safeProgress, 0.9, 1));

  return {
    progress: safeProgress,
    enter,
    handoff,
    exit: handoff,
    settled,
  };
}
