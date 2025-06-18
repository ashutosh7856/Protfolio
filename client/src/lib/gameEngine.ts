export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTime: number = 0;
  private deltaTime: number = 0;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupCanvas();
  }
  
  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }
  
  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  public update(currentTime: number) {
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
  }
  
  public drawRect(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
  
  public drawCircle(x: number, y: number, radius: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  public drawText(text: string, x: number, y: number, color: string = '#000', fontSize: number = 16, font: string = 'Arial') {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px ${font}`;
    this.ctx.fillText(text, x, y);
  }
  
  public drawEmoji(emoji: string, x: number, y: number, size: number = 32) {
    this.ctx.font = `${size}px Arial`;
    this.ctx.fillText(emoji, x, y);
  }
  
  public drawGrid(cellSize: number, color: string = '#e0e0e0') {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }
  }
  
  public isPointInRect(px: number, py: number, x: number, y: number, width: number, height: number): boolean {
    return px >= x && px <= x + width && py >= y && py <= y + height;
  }
  
  public getDeltaTime(): number {
    return this.deltaTime;
  }
  
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
  
  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}
