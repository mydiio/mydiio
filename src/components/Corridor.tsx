import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeStage } from '../motion';
import { useFrame } from '@react-three/fiber';
import { Box, Plane, OrbitControls } from '@react-three/drei';

function TukModel({ progress }: { progress: number }) {
  const tukRef = useRef<any>(null);
  
  useFrame(() => {
    if (tukRef.current) {
      const x = -3 + progress * 6;
      const z = -1 + progress * 2;
      tukRef.current.position.set(x, 0.2, z);
      tukRef.current.rotation.y = progress * Math.PI * 2;
    }
  });

  return (
    <group ref={tukRef}>
      <Box position={[0, 0.2, 0]} args={[0.8, 0.4, 1.2]}>
        <meshStandardMaterial color="#F5A623" />
      </Box>
      <Box position={[0.4, 0.4, 0]} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#3D6B4F" />
      </Box>
      <Plane position={[0, -0.1, 0.6]} args={[0.6, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1A1A18" />
      </Plane>
    </group>
  );
}

export function Corridor() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pingsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    const pingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    pingTimeline
      .to(pingsRef.current?.querySelector('.ping-1'), { opacity: 1, duration: 0.5 })
      .to(pingsRef.current?.querySelector('.ping-1'), { opacity: 0.5, duration: 0.5 })
      .to(pingsRef.current?.querySelector('.ping-2'), { opacity: 1, duration: 0.5 })
      .to(pingsRef.current?.querySelector('.ping-2'), { opacity: 0.5, duration: 0.5 })
      .to(pingsRef.current?.querySelector('.ping-3'), { opacity: 1, duration: 0.5 })
      .to(pingsRef.current?.querySelector('.ping-3'), { opacity: 0.5, duration: 0.5 });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-ink">
      <div className="h-screen">
        <ThreeStage className="absolute inset-0" frameloop="always">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <TukModel progress={scrollProgress} />
          <OrbitControls enableZoom={false} />
        </ThreeStage>

        <div className="relative z-10 flex items-center h-full container mx-auto px-4">
          <div className="max-w-md">
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
              GPS Corridor
              <br />
              <span className="text-amber">Dehiwala → Ratmalana</span>
            </h2>
            <p className="font-body text-cream/60 text-sm">
              Scroll to see how we verify every play
            </p>
            <div ref={pingsRef} className="font-mono text-xs text-cream/40 mt-8 space-y-2">
              <div className="ping-1 opacity-0 transition-opacity">
                <span className="text-amber">●</span> 6.85°N 79.87°E · Play verified
              </div>
              <div className="ping-2 opacity-0 transition-opacity">
                <span className="text-amber">●</span> 6.82°N 79.85°E · Play verified
              </div>
              <div className="ping-3 opacity-0 transition-opacity">
                <span className="text-amber">●</span> 6.80°N 79.83°E · Play verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
