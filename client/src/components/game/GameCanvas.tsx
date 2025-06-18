import React, { useRef, useEffect } from 'react';
import { GameEngine } from '@/lib/gameEngine';

interface GameCanvasProps {
  width?: number;
  height?: number;
  onEngine?: (engine: GameEngine) => void;
  children?: React.ReactNode;
}

export function GameCanvas({ width = 800, height = 600, onEngine, children }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  
  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new GameEngine(canvasRef.current);
      onEngine?.(engineRef.current);
    }
  }, [onEngine]);
  
  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg bg-white"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {children}
    </div>
  );
}
