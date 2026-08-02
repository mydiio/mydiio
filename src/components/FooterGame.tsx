import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Obstacle {
  x: number;
  width: number;
  height: number;
  speed: number;
}

export function FooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const frameCountRef = useRef(0);

  const tuk = useRef({
    x: 50,
    y: 150,
    width: 30,
    height: 20,
    velocity: 0,
    gravity: 0.6,
    jumpForce: -12,
    grounded: true,
  });

  const startGame = useCallback(() => {
    if (gameOver) {
      setScore(0);
      setGameOver(false);
      obstaclesRef.current = [];
      tuk.current.y = 150;
      tuk.current.velocity = 0;
      tuk.current.grounded = true;
      frameCountRef.current = 0;
    }
    setIsPlaying(true);
  }, [gameOver]);

  const jump = useCallback(() => {
    if (!isPlaying) {
      startGame();
      return;
    }
    if (tuk.current.grounded && !gameOver) {
      tuk.current.velocity = tuk.current.jumpForce;
      tuk.current.grounded = false;
    }
  }, [isPlaying, startGame, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const gameLoop = () => {
      if (!isPlaying || gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = '#1A1A18';
      ctx.fillRect(0, HEIGHT - 80, WIDTH, 80);
      
      ctx.strokeStyle = '#F5A623';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(0, HEIGHT - 40);
      ctx.lineTo(WIDTH, HEIGHT - 40);
      ctx.stroke();
      ctx.setLineDash([]);

      tuk.current.velocity += tuk.current.gravity;
      tuk.current.y += tuk.current.velocity;

      if (tuk.current.y > HEIGHT - 80 - tuk.current.height) {
        tuk.current.y = HEIGHT - 80 - tuk.current.height;
        tuk.current.velocity = 0;
        tuk.current.grounded = true;
      }

      ctx.fillStyle = '#F5A623';
      ctx.fillRect(tuk.current.x, tuk.current.y, tuk.current.width, tuk.current.height);
      ctx.fillStyle = '#3D6B4F';
      ctx.fillRect(tuk.current.x + 5, tuk.current.y - 10, 20, 10);

      frameCountRef.current++;
      if (frameCountRef.current % 60 === 0) {
        const speed = 2 + Math.floor(score / 10) * 0.5;
        obstaclesRef.current.push({
          x: WIDTH,
          width: 15 + Math.random() * 20,
          height: 15 + Math.random() * 25,
          speed: speed,
        });
      }

      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];
        obs.x -= obs.speed;

        ctx.fillStyle = '#E8920A';
        ctx.beginPath();
        ctx.arc(obs.x + obs.width/2, HEIGHT - 80 - obs.height/2, obs.width/2, 0, Math.PI * 2);
        ctx.fill();

        if (
          tuk.current.x < obs.x + obs.width &&
          tuk.current.x + tuk.current.width > obs.x &&
          tuk.current.y < HEIGHT - 80 - obs.height &&
          tuk.current.y + tuk.current.height > HEIGHT - 80 - obs.height
        ) {
          setGameOver(true);
          setIsPlaying(false);
        }

        if (obs.x + obs.width < tuk.current.x && !obs.hasOwnProperty('scored')) {
          (obs as any).scored = true;
          setScore(prev => prev + 1);
        }

        if (obs.x < -50) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      ctx.fillStyle = '#FDFAF3';
      ctx.font = '20px Space Mono';
      ctx.fillText(`Verified plays: ${score}`, 20, 40);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, score]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="relative bg-ink/10 rounded-xl overflow-hidden cursor-pointer"
        onClick={jump}
      >
        <canvas ref={canvasRef} width={400} height={200} className="w-full h-auto" />
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80">
            <p className="font-body text-cream text-lg mb-2">🚗 Drive to verify plays</p>
            <p className="font-mono text-xs text-cream/60">Tap or press Space to jump</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="mt-4 px-6 py-2 bg-amber text-ink font-medium rounded-lg hover:bg-deep-amber transition-colors"
            >
              Start ride
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80">
            <p className="font-display text-cream text-2xl mb-2">💥 Crash!</p>
            <p className="font-mono text-cream/60 text-sm">Verified: {score} plays</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="mt-4 px-6 py-2 bg-amber text-ink font-medium rounded-lg hover:bg-deep-amber transition-colors"
            >
              Ride again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
