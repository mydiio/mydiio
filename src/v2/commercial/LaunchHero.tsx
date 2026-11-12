import { useEffect, useRef } from "react";

const scenes = [
  "m001-colombo-before-dawn.mp4",
  "m002-rooftops-waking.mp4",
  "m003-street-sunrise.mp4",
  "m006-marine-drive.mp4",
  "m008-tuktuk-higgsfield-v3.mp4",
];
const sceneUrl = (index: number) => `/assets/video/act1/compressed/${scenes[index % scenes.length]}`;
const FADE_SECONDS = 0.75;

export function LaunchHero() {
  const section = useRef<HTMLElement>(null);
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);
  const currentSlot = useRef(0);
  const sceneIndex = useRef(0);
  const fading = useRef(false);
  const visible = useRef(true);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playSafely = (video: HTMLVideoElement) => {
    const result = video.play();
    if (result) void result.catch(() => {});
  };

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting && entry.intersectionRatio > 0.05;
      const videos = [first.current, second.current];
      if (!visible.current || document.hidden) {
        videos.forEach((video) => video?.pause());
      } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const active = videos[currentSlot.current];
        if (active) playSafely(active);
      }
    }, { threshold: [0, 0.05, 0.15] });
    observer.observe(node);
    const onVisibility = () => {
      if (document.hidden) {
        first.current?.pause();
        second.current?.pause();
      } else if (visible.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const active = currentSlot.current === 0 ? first.current : second.current;
        if (active) playSafely(active);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  const advance = (video: HTMLVideoElement) => {
    if (!visible.current || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches || fading.current) return;
    const videos = [first.current, second.current];
    const active = videos[currentSlot.current];
    const upcoming = videos[1 - currentSlot.current];
    if (!active || !upcoming || video !== active) return;
    if (!Number.isFinite(active.duration) || active.duration <= 0) return;
    const remaining = (active.duration - active.currentTime) / (active.playbackRate || 1);
    if (remaining > FADE_SECONDS) return;
    if (upcoming.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      // Keep a finished clip visible until the next clip has a frame ready.
      if (active.ended) active.pause();
      return;
    }
    fading.current = true;
    upcoming.currentTime = 0;
    upcoming.playbackRate = 1;
    playSafely(upcoming);
    upcoming.classList.add("atlas-scene-visible");
    active.classList.remove("atlas-scene-visible");
    const outgoingSlot = currentSlot.current;
    currentSlot.current = 1 - currentSlot.current;
    sceneIndex.current = (sceneIndex.current + 1) % scenes.length;
    fadeTimer.current = setTimeout(() => {
      const outgoing = videos[outgoingSlot];
      if (outgoing) {
        outgoing.pause();
        outgoing.src = sceneUrl(sceneIndex.current + 1);
        outgoing.load();
      }
      fading.current = false;
    }, FADE_SECONDS * 1000 + 100);
  };

  const onReady = (video: HTMLVideoElement) => {
    video.playbackRate = 1;
    const active = currentSlot.current === 0 ? first.current : second.current;
    if (active && active !== video && active.ended) advance(active);
  };

  return (
    <section ref={section} data-atlas-video-performance-v1 className="commercial-hero commercial-hero-refined" data-atlas-tone="dark" aria-labelledby="commercial-hero-title">
      <video ref={first} className="atlas-scene-video atlas-scene-visible" autoPlay loop muted playsInline preload="auto" aria-hidden="true" src={sceneUrl(0)} onLoadedMetadata={(event) => onReady(event.currentTarget)}  onCanPlay={(event) => onReady(event.currentTarget)} />
      <div className="commercial-hero-copy">
        <span className="commercial-eyebrow">Advertising inside Colombo&apos;s tuk-tuks</span>
        <h1 id="commercial-hero-title">Your next customer is going somewhere. <span>Go with them.</span></h1>
        <p className="commercial-hero-description">
          Put your business on screens inside Colombo&apos;s tuk-tuks, with campaign delivery you can track.
        </p>
        <div className="commercial-actions">
          <a className="atlas-button-primary" href="/mydiio-campaign-studio-v4-4.html">
            Preview your advert 
          </a>
          <a className="commercial-secondary" href="/advertise#monthly-packages">
            Explore packages 
          </a>
        </div>
      </div>
    </section>
  );
}
