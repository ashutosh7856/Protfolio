import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGameStore } from '@/lib/stores/useGameStore';
import { ArrowLeft } from 'lucide-react';

export function Achievements() {
  const { achievements, setMode } = useGameStore();
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setMode('menu')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Achievements</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Progress</span>
              <Badge variant="secondary">
                {unlockedCount}/{totalCount}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={completionPercentage} className="mb-2" />
            <p className="text-sm text-gray-600">
              {completionPercentage.toFixed(0)}% achievements unlocked
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <Card 
              key={achievement.id}
              className={`transition-all ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                  : 'bg-gray-50'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </span>
                    <div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                      {achievement.unlocked && (
                        <Badge className="bg-green-500 text-white text-xs">
                          ✓ Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">
                  {achievement.description}
                </p>
                
                {!achievement.unlocked && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Keep playing brain training games to unlock more achievements!
          </p>
          <div className="space-x-4">
            <Button onClick={() => setMode('menu')}>
              Main Menu
            </Button>
            <Button onClick={() => setMode('garden')} variant="outline">
              Garden
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
