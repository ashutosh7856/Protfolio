import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/lib/stores/useGameStore';
import { useAudio } from '@/lib/stores/useAudio';
import { LogicPuzzle } from '@/types/game';

const PUZZLES: LogicPuzzle[] = [
  {
    id: '1',
    type: 'sequence',
    question: 'What comes next in the sequence: 2, 4, 8, 16, ?',
    options: ['24', '32', '20', '18'],
    correct: 1,
    difficulty: 1
  },
  {
    id: '2',
    type: 'math',
    question: 'If a magical flower doubles every day and fills a garden in 30 days, when is the garden half full?',
    options: ['Day 15', 'Day 29', 'Day 25', 'Day 28'],
    correct: 1,
    difficulty: 2
  },
  {
    id: '3',
    type: 'spatial',
    question: 'Which shape completes the pattern: ○ △ ○ △ ?',
    options: ['○', '△', '□', '♦'],
    correct: 0,
    difficulty: 1
  },
  {
    id: '4',
    type: 'sequence',
    question: 'Complete the pattern: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '10', '15'],
    correct: 1,
    difficulty: 3
  },
  {
    id: '5',
    type: 'math',
    question: 'A garden has 3 magical trees. Each tree has 4 branches. Each branch has 5 leaves. How many leaves total?',
    options: ['60', '45', '50', '55'],
    correct: 0,
    difficulty: 2
  },
  {
    id: '6',
    type: 'spatial',
    question: 'If you rotate ⬆️ clockwise 90 degrees, what do you get?',
    options: ['⬇️', '➡️', '⬅️', '⬆️'],
    correct: 1,
    difficulty: 2
  },
  {
    id: '7',
    type: 'sequence',
    question: 'What\'s the missing number: 3, 6, 12, ?, 48',
    options: ['18', '24', '20', '30'],
    correct: 1,
    difficulty: 2
  },
  {
    id: '8',
    type: 'math',
    question: 'A magical pond doubles its lily pads each day. If it has 8 lily pads on day 3, how many on day 1?',
    options: ['1', '2', '4', '6'],
    correct: 1,
    difficulty: 3
  }
];

export function LogicGame() {
  const { setMode, recordGame, level } = useGameStore();
  const { playHit, playSuccess } = useAudio();
  
  const [currentPuzzle, setCurrentPuzzle] = useState<LogicPuzzle | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const maxPuzzles = Math.min(5 + level, PUZZLES.length);
  const availablePuzzles = PUZZLES.filter(p => p.difficulty <= level + 1);
  
  const initializeGame = useCallback(() => {
    setGameStarted(true);
    setGameCompleted(false);
    setPuzzleIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setShowResult(false);
    setTimeLeft(30);
    
    // Shuffle and select puzzles
    const shuffled = [...availablePuzzles].sort(() => Math.random() - 0.5);
    setCurrentPuzzle(shuffled[0]);
  }, [level, availablePuzzles]);
  
  const nextPuzzle = () => {
    if (puzzleIndex + 1 >= maxPuzzles) {
      // Game completed
      const finalScore = score + (timeLeft * 5);
      setScore(finalScore);
      setGameCompleted(true);
      recordGame(true, finalScore);
      return;
    }
    
    // Next puzzle
    const shuffled = [...availablePuzzles].sort(() => Math.random() - 0.5);
    const nextIndex = puzzleIndex + 1;
    setPuzzleIndex(nextIndex);
    setCurrentPuzzle(shuffled[nextIndex % shuffled.length]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };
  
  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentPuzzle?.correct) {
      playSuccess();
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 100 + (currentPuzzle?.difficulty || 1) * 50 + timeLeft * 5);
    } else {
      playHit();
    }
    
    setTimeout(nextPuzzle, 2000);
  };
  
  // Timer
  useEffect(() => {
    if (!gameStarted || gameCompleted || showResult || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up, wrong answer
          setShowResult(true);
          setSelectedAnswer(-1);
          setTimeout(nextPuzzle, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted, showResult, timeLeft, nextPuzzle]);
  
  if (!gameStarted) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Logic Puzzles</h1>
        <p className="text-gray-600 mb-6">
          Solve {maxPuzzles} logic puzzles to earn coins! You have 30 seconds per puzzle.
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
    const percentage = Math.round((correctAnswers / maxPuzzles) * 100);
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Logic Master! 🧠</h1>
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="text-lg mb-2">
            You answered {correctAnswers} out of {maxPuzzles} puzzles correctly ({percentage}%)
          </p>
          <p className="text-2xl font-bold text-green-600">Score: {score}</p>
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
  
  if (!currentPuzzle) return null;
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Logic Puzzles - Level {level}</h1>
        <div className="flex justify-center space-x-6 text-lg">
          <span>Puzzle: {puzzleIndex + 1}/{maxPuzzles}</span>
          <span>Score: {score}</span>
          <span className={timeLeft <= 10 ? 'text-red-600 font-bold' : ''}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-sm text-gray-500 block">
              {currentPuzzle.type.charAt(0).toUpperCase() + currentPuzzle.type.slice(1)} Puzzle
            </span>
            {currentPuzzle.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {currentPuzzle.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showResult
                    ? index === currentPuzzle.correct
                      ? "default"
                      : selectedAnswer === index
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                className={`p-4 text-left justify-start ${
                  showResult && index === currentPuzzle.correct
                    ? 'bg-green-500 text-white'
                    : showResult && selectedAnswer === index && index !== currentPuzzle.correct
                    ? 'bg-red-500 text-white'
                    : ''
                }`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {showResult && (
            <div className="mt-4 text-center">
              {selectedAnswer === currentPuzzle.correct ? (
                <p className="text-green-600 font-bold">Correct! ✅</p>
              ) : selectedAnswer === -1 ? (
                <p className="text-red-600 font-bold">Time's up! ⏰</p>
              ) : (
                <p className="text-red-600 font-bold">Incorrect! ❌</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button onClick={() => setMode('menu')} variant="outline">
          Quit Game
        </Button>
      </div>
    </div>
  );
}
