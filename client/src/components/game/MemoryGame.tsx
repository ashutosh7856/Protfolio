import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGameStore } from '@/lib/stores/useGameStore';
import { useAudio } from '@/lib/stores/useAudio';
import { MemoryCard } from '@/types/game';

const SYMBOLS = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🪷', '🌾'];

export function MemoryGame() {
  const { setMode, recordGame, level } = useGameStore();
  const { playHit, playSuccess } = useAudio();
  
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const difficulty = Math.min(level, 4);
  const pairCount = 4 + difficulty * 2; // 6-12 pairs based on level
  
  const initializeGame = useCallback(() => {
    const gameSymbols = SYMBOLS.slice(0, pairCount);
    const cardPairs = [...gameSymbols, ...gameSymbols];
    
    // Shuffle cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    const gameCards: MemoryCard[] = cardPairs.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
  }, [pairCount]);
  
  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId) || cards[cardId].isMatched) {
      return;
    }
    
    playHit();
    setFlippedCards(prev => [...prev, cardId]);
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
  };
  
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];
      
      setMoves(prev => prev + 1);
      
      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        playSuccess();
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, playHit, playSuccess]);
  
  useEffect(() => {
    if (matchedPairs === pairCount && gameStarted && !gameCompleted) {
      const finalScore = Math.max(0, 1000 - moves * 10 + difficulty * 200);
      setScore(finalScore);
      setGameCompleted(true);
      recordGame(true, finalScore);
      playSuccess();
    }
  }, [matchedPairs, pairCount, gameStarted, gameCompleted, moves, difficulty, recordGame, playSuccess]);
  
  if (!gameStarted) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Memory Match</h1>
        <p className="text-gray-600 mb-6">
          Find matching pairs of flowers. Level {level} - {pairCount} pairs to match!
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
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Congratulations! 🎉</h1>
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="text-lg mb-2">Game completed in {moves} moves!</p>
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
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Memory Match - Level {level}</h1>
        <div className="flex justify-center space-x-6 text-lg">
          <span>Moves: {moves}</span>
          <span>Pairs: {matchedPairs}/{pairCount}</span>
        </div>
      </div>
      
      <div 
        className="grid gap-3 mx-auto justify-center"
        style={{ 
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(pairCount * 2))}, 1fr)`,
          maxWidth: '600px'
        }}
      >
        {cards.map(card => (
          <Card 
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center cursor-pointer transition-all transform hover:scale-105 ${
              card.isFlipped || card.isMatched 
                ? 'bg-white' 
                : 'bg-gradient-to-br from-purple-400 to-purple-600'
            }`}
            onClick={() => flipCard(card.id)}
          >
            <CardContent className="p-0 flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <span className="text-2xl">{card.symbol}</span>
              ) : (
                <span className="text-white text-lg">?</span>
              )}
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
