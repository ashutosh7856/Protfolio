import React, { useRef, useEffect } from 'react';
import { GardenEngine } from '@/lib/gardenEngine';
import { useGardenStore } from '@/lib/stores/useGardenStore';
import { useGameStore } from '@/lib/stores/useGameStore';

interface GardenEditorProps {
  width?: number;
  height?: number;
}

export function GardenEditor({ width = 800, height = 600 }: GardenEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GardenEngine | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const { gardenItems, selectedPlantType, isDragging, addPlant, movePlant, setIsDragging } = useGardenStore();
  const { spendCoins } = useGameStore();
  
  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new GardenEngine(canvasRef.current);
      startRenderLoop();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const startRenderLoop = () => {
    const render = () => {
      if (engineRef.current) {
        engineRef.current.setGardenItems(gardenItems);
        engineRef.current.render();
      }
      animationRef.current = requestAnimationFrame(render);
    };
    render();
  };
  
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!engineRef.current || !selectedPlantType) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    
    // Snap to grid
    const snapped = engineRef.current.snapToGrid(x, y);
    
    // Check if we can afford the plant
    const plantType = useGardenStore.getState().selectedPlantType;
    if (plantType) {
      const plant = require('@/lib/stores/useGardenStore').plantTypes.find((p: any) => p.id === plantType);
      if (plant && spendCoins(plant.cost)) {
        addPlant(plantType, snapped.x, snapped.y);
      }
    }
  };
  
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!engineRef.current) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    
    const plant = engineRef.current.getPlantAt(x, y);
    if (plant && !selectedPlantType) {
      setIsDragging(true);
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newX = (moveEvent.clientX - rect.left) * (canvas.width / rect.width);
        const newY = (moveEvent.clientY - rect.top) * (canvas.height / rect.height);
        const snapped = engineRef.current!.snapToGrid(newX, newY);
        movePlant(plant.id, snapped.x, snapped.y);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg bg-green-100 cursor-crosshair"
        style={{ maxWidth: '100%', height: 'auto' }}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
      />
      
      {selectedPlantType && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
          Click to plant {selectedPlantType}
        </div>
      )}
      
      {isDragging && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
          Drag to move plant
        </div>
      )}
    </div>
  );
}
