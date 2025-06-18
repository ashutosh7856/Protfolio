import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameState, GameMode, Achievement } from "@/types/game";

interface GameStore extends GameState {
  // Actions
  setMode: (mode: GameMode) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addExperience: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  recordGame: (won: boolean, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  
  // State
  achievements: Achievement[];
  
  // Persistence
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: "first_win",
    name: "First Victory",
    description: "Win your first brain training game",
    icon: "🏆",
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "coin_collector",
    name: "Coin Collector",
    description: "Collect 100 coins",
    icon: "🪙",
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },
  {
    id: "streak_master",
    name: "Streak Master",
    description: "Get a 10-game winning streak",
    icon: "🔥",
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: "garden_starter",
    name: "Garden Starter",
    description: "Plant your first magical plant",
    icon: "🌱",
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "level_up",
    name: "Level Up",
    description: "Reach level 5",
    icon: "⭐",
    unlocked: false,
    progress: 0,
    maxProgress: 5
  }
];

const initialState: GameState = {
  mode: 'menu',
  coins: 0,
  experience: 0,
  level: 1,
  currentStreak: 0,
  bestStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  totalScore: 0
};

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    achievements: defaultAchievements,
    
    setMode: (mode) => set({ mode }),
    
    addCoins: (amount) => {
      set((state) => {
        const newCoins = state.coins + amount;
        get().updateAchievementProgress("coin_collector", newCoins);
        return { coins: newCoins };
      });
    },
    
    spendCoins: (amount) => {
      const state = get();
      if (state.coins >= amount) {
        set({ coins: state.coins - amount });
        return true;
      }
      return false;
    },
    
    addExperience: (amount) => {
      set((state) => {
        const newExp = state.experience + amount;
        const newLevel = Math.floor(newExp / 100) + 1;
        
        if (newLevel > state.level) {
          get().updateAchievementProgress("level_up", newLevel);
        }
        
        return { 
          experience: newExp,
          level: newLevel
        };
      });
    },
    
    incrementStreak: () => {
      set((state) => {
        const newStreak = state.currentStreak + 1;
        const newBest = Math.max(newStreak, state.bestStreak);
        
        get().updateAchievementProgress("streak_master", newStreak);
        
        return {
          currentStreak: newStreak,
          bestStreak: newBest
        };
      });
    },
    
    resetStreak: () => set({ currentStreak: 0 }),
    
    recordGame: (won, score) => {
      set((state) => ({
        gamesPlayed: state.gamesPlayed + 1,
        gamesWon: won ? state.gamesWon + 1 : state.gamesWon,
        totalScore: state.totalScore + score
      }));
      
      if (won) {
        get().incrementStreak();
        get().addCoins(10 + Math.floor(score / 100));
        get().addExperience(20);
        
        if (get().gamesWon === 1) {
          get().unlockAchievement("first_win");
        }
      } else {
        get().resetStreak();
      }
    },
    
    unlockAchievement: (achievementId) => {
      set((state) => ({
        achievements: state.achievements.map(achievement =>
          achievement.id === achievementId
            ? { ...achievement, unlocked: true }
            : achievement
        )
      }));
    },
    
    updateAchievementProgress: (achievementId, progress) => {
      set((state) => {
        const achievement = state.achievements.find(a => a.id === achievementId);
        if (!achievement || achievement.unlocked) return {};
        
        const newProgress = Math.min(progress, achievement.maxProgress);
        const shouldUnlock = newProgress >= achievement.maxProgress;
        
        return {
          achievements: state.achievements.map(a =>
            a.id === achievementId
              ? { ...a, progress: newProgress, unlocked: shouldUnlock }
              : a
          )
        };
      });
    },
    
    saveGame: () => {
      const state = get();
      const saveData = {
        coins: state.coins,
        experience: state.experience,
        level: state.level,
        currentStreak: state.currentStreak,
        bestStreak: state.bestStreak,
        gamesPlayed: state.gamesPlayed,
        gamesWon: state.gamesWon,
        totalScore: state.totalScore,
        achievements: state.achievements
      };
      localStorage.setItem('magicalGardenSave', JSON.stringify(saveData));
    },
    
    loadGame: () => {
      try {
        const saveData = localStorage.getItem('magicalGardenSave');
        if (saveData) {
          const parsed = JSON.parse(saveData);
          set({
            coins: parsed.coins || 0,
            experience: parsed.experience || 0,
            level: parsed.level || 1,
            currentStreak: parsed.currentStreak || 0,
            bestStreak: parsed.bestStreak || 0,
            gamesPlayed: parsed.gamesPlayed || 0,
            gamesWon: parsed.gamesWon || 0,
            totalScore: parsed.totalScore || 0,
            achievements: parsed.achievements || defaultAchievements
          });
        }
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    },
    
    resetGame: () => {
      set({
        ...initialState,
        achievements: defaultAchievements
      });
      localStorage.removeItem('magicalGardenSave');
    }
  }))
);
