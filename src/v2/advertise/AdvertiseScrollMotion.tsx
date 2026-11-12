import { useEffect } from "react";

export function AdvertiseScrollMotion() {
  useEffect(() => {
    const page = document.querySelector(
      "main[data-advertiser-page]"
    );

    if (!page) return;

    const sections = Array.from(
      page.querySelectorAll<HTMLElement>(":scope > section")
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches ||
        !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add("atlas-section-visible");
          } else {
            element.classList.remove("atlas-section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    sections.forEach((section) => {
      section.classList.add("atlas-section-observed");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove(
          "atlas-section-observed",
          "atlas-section-visible"
        );
      });
    };
  }, []);

  return null;
}
