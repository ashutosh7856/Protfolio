import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGardenStore, plantTypes } from '@/lib/stores/useGardenStore';
import { useGameStore } from '@/lib/stores/useGameStore';

export function PlantPalette() {
  const { selectedPlantType, setSelectedPlantType } = useGardenStore();
  const { coins, level } = useGameStore();
  
  const availablePlants = plantTypes.filter(plant => plant.unlockLevel <= level);
  
  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Plant Collection</h2>
      
      <div className="mb-4 p-3 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Coins:</span>
          <span className="text-green-600 font-bold">🪙 {coins}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Level:</span>
          <span className="text-blue-600 font-bold">⭐ {level}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {availablePlants.map(plant => {
          const canAfford = coins >= plant.cost;
          const isSelected = selectedPlantType === plant.id;
          
          return (
            <Card 
              key={plant.id}
              className={`transition-all cursor-pointer hover:shadow-md ${
                isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''
              } ${!canAfford ? 'opacity-60' : ''}`}
              onClick={() => canAfford ? setSelectedPlantType(isSelected ? null : plant.id) : null}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{plant.sprite}</span>
                  {plant.magical && (
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      ✨ Magical
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-sm">{plant.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cost:</span>
                  <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                    🪙 {plant.cost}
                  </span>
                </div>
                {plant.unlockLevel > 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Unlocked at level {plant.unlockLevel}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedPlantType && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Click anywhere in the garden to plant your selected flower!
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setSelectedPlantType(null)}
          >
            Cancel Selection
          </Button>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-2">
          Unlock more plants by leveling up through brain training games!
        </p>
      </div>
    </div>
  );
}
