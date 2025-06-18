export type GameMode = 'menu' | 'tutorial' | 'memory' | 'pattern' | 'logic' | 'garden' | 'achievements';

export interface GameState {
  mode: GameMode;
  coins: number;
  experience: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface PlantType {
  id: string;
  name: string;
  cost: number;
  unlockLevel: number;
  sprite: string;
  width: number;
  height: number;
  magical: boolean;
}

export interface GardenItem {
  id: string;
  plantType: string;
  x: number;
  y: number;
  growth: number;
  planted: number;
}

export interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PatternTile {
  id: number;
  color: string;
  active: boolean;
  userClicked: boolean;
}

export interface LogicPuzzle {
  id: string;
  type: 'sequence' | 'math' | 'spatial';
  question: string;
  options: string[];
  correct: number;
  difficulty: number;
}
