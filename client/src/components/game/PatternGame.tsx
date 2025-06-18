import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGameStore } from '@/lib/stores/useGameStore';
import { useAudio } from '@/lib/stores/useAudio';
import { PatternTile } from '@/types/game';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export function PatternGame() {
  const { setMode, recordGame, level } = useGameStore();
  const { playHit, playSuccess } = useAudio();
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [tiles, setTiles] = useState<PatternTile[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  const tileCount = 6;
  const maxRounds = 5 + level * 2;
  
  const initializeGame = useCallback(() => {
    const gameTiles: PatternTile[] = COLORS.slice(0, tileCount).map((color, index) => ({
      id: index,
      color,
      active: false,
      userClicked: false
    }));
    
    setTiles(gameTiles);
    setSequence([]);
    setUserSequence([]);
    setRound(1);
    setCurrentIndex(0);
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
    setLives(3);
    
    // Start first round
    setTimeout(() => startNewRound([]), 1000);
  }, [level]);
  
  const startNewRound = (currentSequence: number[]) => {
    const newTile = Math.floor(Math.random() * tileCount);
    const newSequence = [...currentSequence, newTile];
    setSequence(newSequence);
    setUserSequence([]);
    setCurrentIndex(0);
    showPattern(newSequence);
  };
  
  const showPattern = async (pattern: number[]) => {
    setIsShowingPattern(true);
    setTiles(prev => prev.map(tile => ({ ...tile, active: false, userClicked: false })));
    
    for (let i = 0; i < pattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setTiles(prev => prev.map(tile => 
        tile.id === pattern[i] ? { ...tile, active: true } : tile
      ));
      playHit();
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setTiles(prev => prev.map(tile => ({ ...tile, active: false })));
    }
    
    setIsShowingPattern(false);
  };
  
  const handleTileClick = (tileId: number) => {
    if (isShowingPattern || gameCompleted) return;
    
    playHit();
    
    setTiles(prev => prev.map(tile => 
      tile.id === tileId ? { ...tile, userClicked: true } : tile
    ));
    
    setTimeout(() => {
      setTiles(prev => prev.map(tile => 
        tile.id === tileId ? { ...tile, userClicked: false } : tile
      ));
    }, 200);
    
    const newUserSequence = [...userSequence, tileId];
    setUserSequence(newUserSequence);
    
    // Check if correct
    if (sequence[newUserSequence.length - 1] !== tileId) {
      // Wrong tile
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives <= 0) {
        // Game over
        setGameCompleted(true);
        recordGame(false, score);
      } else {
        // Try again
        setTimeout(() => {
          setUserSequence([]);
          showPattern(sequence);
        }, 1000);
      }
      return;
    }
    
    if (newUserSequence.length === sequence.length) {
      // Round completed
      const roundScore = sequence.length * 50 + (lives * 25);
      setScore(prev => prev + roundScore);
      playSuccess();
      
      if (round >= maxRounds) {
        // Game completed
        setGameCompleted(true);
        recordGame(true, score + roundScore);
      } else {
        // Next round
        setRound(prev => prev + 1);
        setTimeout(() => startNewRound(sequence), 1500);
      }
    }
  };
  
  if (!gameStarted) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Pattern Recognition</h1>
        <p className="text-gray-600 mb-6">
          Watch the pattern and repeat it back. Complete {maxRounds} rounds to win!
        </p>
        <Button onClick={initializeGame} size="lg">
          Start Game
        </Button>
        <div className="mt-4">
          <Button onClick={() => setMode('menu')} variant="outline">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }
  
  if (gameCompleted) {
    const won = lives > 0;
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className={`text-3xl font-bold mb-4 ${won ? 'text-green-600' : 'text-red-600'}`}>
          {won ? 'Excellent! 🎉' : 'Game Over 💔'}
        </h1>
        <div className={`${won ? 'bg-green-50' : 'bg-red-50'} p-6 rounded-lg mb-6`}>
          <p className="text-lg mb-2">
            {won ? `All ${maxRounds} rounds completed!` : `You completed ${round - 1} rounds`}
          </p>
          <p className="text-2xl font-bold">Score: {score}</p>
        </div>
        <div className="space-x-4">
          <Button onClick={initializeGame}>
            Play Again
          </Button>
          <Button onClick={() => setMode('menu')} variant="outline">
            Main Menu
          </Button>
          <Button onClick={() => setMode('garden')} variant="outline">
            Garden
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Pattern Game - Level {level}</h1>
        <div className="flex justify-center space-x-6 text-lg">
          <span>Round: {round}/{maxRounds}</span>
          <span>Score: {score}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
        </div>
        {isShowingPattern && (
          <p className="text-blue-600 mt-2">Watch the pattern...</p>
        )}
        {!isShowingPattern && userSequence.length < sequence.length && (
          <p className="text-green-600 mt-2">Repeat the pattern ({userSequence.length + 1}/{sequence.length})</p>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {tiles.map(tile => (
          <Card 
            key={tile.id}
            className={`h-20 cursor-pointer transition-all transform hover:scale-105 ${
              tile.active || tile.userClicked ? 'scale-110 shadow-lg' : ''
            }`}
            style={{ 
              backgroundColor: tile.active || tile.userClicked ? tile.color : '#e5e7eb',
              borderColor: tile.color,
              borderWidth: '3px'
            }}
            onClick={() => handleTileClick(tile.id)}
          >
            <CardContent className="p-0 h-full flex items-center justify-center">
              {/* Visual feedback */}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Button onClick={() => setMode('menu')} variant="outline">
          Quit Game
        </Button>
      </div>
    </div>
  );
}
