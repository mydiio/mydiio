import React, { useRef } from 'react';
import { useParallax, Reveal } from '../motion';

export function Hero() {
  const skyRef = useParallax<HTMLDivElement>(0.05);
  const skylineRef = useParallax<HTMLDivElement>(0.15);
  const roadRef = useParallax<HTMLDivElement>(0.3);
  const foregroundRef = useParallax<HTMLDivElement>(0.5);

  return (
    <section className="relative h-screen overflow-hidden bg-ink">
      <div ref={skyRef} className="absolute inset-0 bg-gradient-to-b from-ink to-ink/80" />
      
      <div ref={skylineRef} className="absolute inset-0">
        <div className="h-full w-full bg-[url('/skyline.svg')] bg-bottom bg-repeat-x opacity-20" />
      </div>
      
      <div ref={roadRef} className="absolute bottom-0 left-0 right-0 h-1/3">
        <div className="h-full w-full bg-[url('/road.svg')] bg-bottom bg-repeat-x opacity-40" />
      </div>
      
      <div ref={foregroundRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] animate-float">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-[15%] animate-float-delayed">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#3D6B4F">
            <path d="M10 0C4.5 0 0 4.5 0 10c0 5.5 10 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10z" />
            <circle cx="10" cy="10" r="3" fill="#FDFAF3" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex items-center h-full container mx-auto px-4">
        <div className="max-w-2xl">
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-tight">
              Every ride
              <br />
              <span className="text-amber">is an audience</span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.4}>
            <p className="font-body text-lg text-cream/70 mt-6 max-w-lg">
              GPS-verified plays, a report every Monday. Your ads on Colombo's roads.
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={0.6}>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/build"
                className="px-8 py-3 bg-amber text-ink font-medium rounded hover:bg-deep-amber transition-colors"
              >
                Build your campaign
              </a>
              <a
                href="https://wa.me/94770000000"
                className="px-8 py-3 bg-cream/10 text-cream font-medium rounded hover:bg-cream/20 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-ink/80 backdrop-blur-sm border-t border-cream/10">
        <div className="overflow-hidden py-2">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-mono text-xs text-cream/60 mx-8">GPS-verified plays</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Report every Monday</span>
            <span className="font-mono text-xs text-cream/60 mx-8">7 days free</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Refundable deposit</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Drivers paid on the 5th</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Live in 72h</span>
            <span className="font-mono text-xs text-cream/60 mx-8">GPS-verified plays</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Report every Monday</span>
            <span className="font-mono text-xs text-cream/60 mx-8">7 days free</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Refundable deposit</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Drivers paid on the 5th</span>
            <span className="font-mono text-xs text-cream/60 mx-8">Live in 72h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
