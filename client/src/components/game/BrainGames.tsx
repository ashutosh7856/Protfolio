import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Puzzle } from 'lucide-react';
import { useGameStore } from '@/lib/stores/useGameStore';

export function BrainGames() {
  const { setMode, level } = useGameStore();
  
  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Match pairs of cards to test your memory',
      icon: <Brain className="w-8 h-8" />,
      color: 'bg-blue-500',
      unlocked: true
    },
    {
      id: 'pattern',
      title: 'Pattern Recognition',
      description: 'Follow the sequence of colors and sounds',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-purple-500',
      unlocked: level >= 2
    },
    {
      id: 'logic',
      title: 'Logic Puzzles',
      description: 'Solve mathematical and spatial challenges',
      icon: <Puzzle className="w-8 h-8" />,
      color: 'bg-orange-500',
      unlocked: level >= 3
    }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Brain Training Games</h1>
        <p className="text-gray-600">Challenge your mind and earn coins for your magical garden!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className={`transition-all hover:scale-105 ${game.unlocked ? 'cursor-pointer' : 'opacity-50'}`}>
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white`}>
                {game.icon}
              </div>
              <CardTitle className="text-xl">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">{game.description}</p>
              {game.unlocked ? (
                <Button 
                  onClick={() => setMode(game.id as any)}
                  className="w-full"
                >
                  Play Game
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Unlock at Level {game.id === 'pattern' ? 2 : 3}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button 
          onClick={() => setMode('garden')}
          variant="outline"
          className="mr-4"
        >
          Back to Garden
        </Button>
        <Button 
          onClick={() => setMode('menu')}
          variant="outline"
        >
          Main Menu
        </Button>
      </div>
    </div>
  );
}
