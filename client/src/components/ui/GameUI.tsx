import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGameStore } from '@/lib/stores/useGameStore';
import { useAudio } from '@/lib/stores/useAudio';
import { 
  Brain, 
  Coins, 
  Star, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Settings,
  Home
} from 'lucide-react';

export function GameUI() {
  const { 
    mode, 
    setMode, 
    coins, 
    level, 
    experience, 
    currentStreak, 
    gamesWon, 
    gamesPlayed 
  } = useGameStore();
  
  const { isMuted, toggleMute } = useAudio();
  
  const experienceForNextLevel = level * 100;
  const currentLevelExp = experience % 100;
  const progressPercentage = (currentLevelExp / 100) * 100;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Game title and navigation */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-green-600">
              🌸 Magical Garden
            </h1>
            
            {mode !== 'menu' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('menu')}
                className="flex items-center space-x-1"
              >
                <Home className="w-4 h-4" />
                <span>Menu</span>
              </Button>
            )}
          </div>
          
          {/* Center - Player stats */}
          <div className="flex items-center space-x-6">
            <Card className="p-2">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{coins}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">Level {level}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {currentLevelExp}/100
                  </span>
                </div>
              </CardContent>
            </Card>
            
            {currentStreak > 0 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                🔥 {currentStreak} streak
              </Badge>
            )}
            
            {gamesPlayed > 0 && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Trophy className="w-4 h-4" />
                <span>{gamesWon}/{gamesPlayed}</span>
              </div>
            )}
          </div>
          
          {/* Right side - Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="flex items-center space-x-1"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode('achievements')}
              className="flex items-center space-x-1"
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
