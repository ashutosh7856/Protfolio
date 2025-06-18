import { GameEngine } from './gameEngine';
import { GardenItem, PlantType } from '@/types/game';
import { plantTypes } from './stores/useGardenStore';

export class GardenEngine extends GameEngine {
  private gardenItems: GardenItem[] = [];
  private backgroundPattern: string = 'grass';
  
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  
  public setGardenItems(items: GardenItem[]) {
    this.gardenItems = items;
  }
  
  public render() {
    this.clear();
    this.drawBackground();
    this.drawGrid(32, '#c8e6c9');
    this.drawPlants();
  }
  
  private drawBackground() {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    
    // Create a grass-like pattern
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    // Add some texture
    ctx.fillStyle = '#66bb6a';
    for (let x = 0; x < canvas.clientWidth; x += 8) {
      for (let y = 0; y < canvas.clientHeight; y += 8) {
        if (Math.random() > 0.7) {
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  }
  
  private drawPlants() {
    this.gardenItems.forEach(item => {
      const plantType = plantTypes.find(p => p.id === item.plantType);
      if (plantType) {
        this.drawPlant(item, plantType);
        
        if (plantType.magical) {
          this.drawMagicalEffect(item.x, item.y, plantType.width);
        }
      }
    });
  }
  
  private drawPlant(item: GardenItem, plantType: PlantType) {
    const ctx = this.getContext();
    
    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(item.x - 2, item.y + plantType.height - 4, plantType.width + 4, 8);
    
    // Scale based on growth
    const scale = 0.3 + (item.growth * 0.7);
    const scaledWidth = plantType.width * scale;
    const scaledHeight = plantType.height * scale;
    
    // Draw plant emoji
    ctx.font = `${scaledHeight}px Arial`;
    ctx.fillText(
      plantType.sprite,
      item.x + (plantType.width - scaledWidth) / 2,
      item.y + scaledHeight
    );
    
    // Draw growth indicator for young plants
    if (item.growth < 1) {
      this.drawGrowthBar(item.x, item.y - 10, plantType.width, item.growth);
    }
  }
  
  private drawGrowthBar(x: number, y: number, width: number, growth: number) {
    const ctx = this.getContext();
    
    // Background
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(x, y, width, 4);
    
    // Progress
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(x, y, width * growth, 4);
  }
  
  private drawMagicalEffect(x: number, y: number, size: number) {
    const ctx = this.getContext();
    const time = Date.now() * 0.003;
    
    // Draw sparkles around magical plants
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + time;
      const radius = size * 0.8;
      const sparkleX = x + size/2 + Math.cos(angle) * radius;
      const sparkleY = y + size/2 + Math.sin(angle) * radius;
      
      ctx.fillStyle = `hsl(${(time * 100 + i * 60) % 360}, 70%, 70%)`;
      ctx.fillRect(sparkleX - 1, sparkleY - 1, 2, 2);
    }
  }
  
  public getPlantAt(x: number, y: number): GardenItem | null {
    for (let i = this.gardenItems.length - 1; i >= 0; i--) {
      const item = this.gardenItems[i];
      const plantType = plantTypes.find(p => p.id === item.plantType);
      
      if (plantType && this.isPointInRect(x, y, item.x, item.y, plantType.width, plantType.height)) {
        return item;
      }
    }
    return null;
  }
  
  public snapToGrid(x: number, y: number, gridSize: number = 32): { x: number, y: number } {
    return {
      x: Math.floor(x / gridSize) * gridSize,
      y: Math.floor(y / gridSize) * gridSize
    };
  }
}
