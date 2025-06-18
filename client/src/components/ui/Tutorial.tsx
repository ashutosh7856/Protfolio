import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useGameStore } from '@/lib/stores/useGameStore';

const TUTORIAL_STEPS = [
  {
    title: "Welcome to Magical Garden! 🌸",
    content: "Train your brain and build the garden of your dreams! Complete cognitive challenges to earn coins and unlock magical plants.",
    image: "🧠"
  },
  {
    title: "Brain Training Games 🎮",
    content: "Play three types of brain games: Memory Match, Pattern Recognition, and Logic Puzzles. Each game tests different cognitive skills.",
    image: "🎯"
  },
  {
    title: "Earn Coins & Experience 🪙",
    content: "Win games to earn coins and experience points. Higher scores and win streaks give you more rewards!",
    image: "⭐"
  },
  {
    title: "Build Your Garden 🌱",
    content: "Use coins to buy plants and decorations. Unlock magical plants as you level up by gaining experience.",
    image: "🌺"
  },
  {
    title: "Level Up System 📈",
    content: "Gain 100 experience points to level up. Higher levels unlock more challenging games and rare magical plants.",
    image: "🎊"
  },
  {
    title: "Achievements & Streaks 🏆",
    content: "Complete achievements and maintain win streaks for bonus rewards. Check your progress anytime!",
    image: "🥇"
  }
];

export function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setMode } = useGameStore();
  
  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const completeTutorial = () => {
    setMode('menu');
  };
  
  const step = TUTORIAL_STEPS[currentStep];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10"
          onClick={() => setMode('menu')}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{step.image}</div>
          <CardTitle className="text-xl">{step.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-600 text-center mb-6">
            {step.content}
          </p>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="flex space-x-2">
              {TUTORIAL_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {currentStep === TUTORIAL_STEPS.length - 1 ? (
              <Button onClick={completeTutorial} className="flex items-center space-x-1">
                <span>Get Started!</span>
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center space-x-1">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
