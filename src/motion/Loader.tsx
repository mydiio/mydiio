import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Complete after reaching 100%
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 z-50 bg-cream flex items-center justify-center">
      <div className="text-center">
        {/* Simple spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-amber/20 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-amber rounded-full"
            style={{
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              transform: `rotate(${progress * 3.6}deg)`,
              transition: 'transform 0.1s linear',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-amber rounded-full" />
          </div>
        </div>
        
        <div className="font-mono text-sm text-ink/60">acquiring signal...</div>
        <div className="font-mono text-xs text-ink/40 mt-1">
          6.85°N 79.87°E · {progress}%
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-amber/10 rounded-full mt-4 mx-auto overflow-hidden">
          <div 
            className="h-full bg-amber rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
