import { create } from "zustand";
import { GardenItem, PlantType } from "@/types/game";

interface GardenStore {
  gardenItems: GardenItem[];
  selectedPlantType: string | null;
  isDragging: boolean;
  
  // Actions
  addPlant: (plantType: string, x: number, y: number) => void;
  removePlant: (id: string) => void;
  movePlant: (id: string, x: number, y: number) => void;
  setSelectedPlantType: (plantType: string | null) => void;
  setIsDragging: (dragging: boolean) => void;
  growPlants: () => void;
  
  // Persistence
  saveGarden: () => void;
  loadGarden: () => void;
  clearGarden: () => void;
}

export const plantTypes: PlantType[] = [
  {
    id: "sunflower",
    name: "Sunflower",
    cost: 10,
    unlockLevel: 1,
    sprite: "🌻",
    width: 32,
    height: 48,
    magical: false
  },
  {
    id: "rose",
    name: "Rose",
    cost: 15,
    unlockLevel: 1,
    sprite: "🌹",
    width: 24,
    height: 32,
    magical: false
  },
  {
    id: "tulip",
    name: "Tulip",
    cost: 12,
    unlockLevel: 2,
    sprite: "🌷",
    width: 20,
    height: 36,
    magical: false
  },
  {
    id: "magic_mushroom",
    name: "Magic Mushroom",
    cost: 50,
    unlockLevel: 3,
    sprite: "🍄",
    width: 28,
    height: 28,
    magical: true
  },
  {
    id: "crystal_flower",
    name: "Crystal Flower",
    cost: 100,
    unlockLevel: 5,
    sprite: "💎",
    width: 32,
    height: 40,
    magical: true
  },
  {
    id: "fairy_tree",
    name: "Fairy Tree",
    cost: 200,
    unlockLevel: 8,
    sprite: "🧚‍♀️",
    width: 48,
    height: 64,
    magical: true
  }
];

export const useGardenStore = create<GardenStore>((set, get) => ({
  gardenItems: [],
  selectedPlantType: null,
  isDragging: false,
  
  addPlant: (plantType, x, y) => {
    const newPlant: GardenItem = {
      id: `plant_${Date.now()}_${Math.random()}`,
      plantType,
      x,
      y,
      growth: 0,
      planted: Date.now()
    };
    
    set((state) => ({
      gardenItems: [...state.gardenItems, newPlant]
    }));
  },
  
  removePlant: (id) => {
    set((state) => ({
      gardenItems: state.gardenItems.filter(item => item.id !== id)
    }));
  },
  
  movePlant: (id, x, y) => {
    set((state) => ({
      gardenItems: state.gardenItems.map(item =>
        item.id === id ? { ...item, x, y } : item
      )
    }));
  },
  
  setSelectedPlantType: (plantType) => set({ selectedPlantType: plantType }),
  
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  
  growPlants: () => {
    set((state) => ({
      gardenItems: state.gardenItems.map(item => ({
        ...item,
        growth: Math.min(1, item.growth + 0.001) // Slow growth over time
      }))
    }));
  },
  
  saveGarden: () => {
    const state = get();
    localStorage.setItem('magicalGardenData', JSON.stringify(state.gardenItems));
  },
  
  loadGarden: () => {
    try {
      const gardenData = localStorage.getItem('magicalGardenData');
      if (gardenData) {
        const items = JSON.parse(gardenData);
        set({ gardenItems: items });
      }
    } catch (error) {
      console.error('Failed to load garden:', error);
    }
  },
  
  clearGarden: () => {
    set({ gardenItems: [] });
    localStorage.removeItem('magicalGardenData');
  }
}));
