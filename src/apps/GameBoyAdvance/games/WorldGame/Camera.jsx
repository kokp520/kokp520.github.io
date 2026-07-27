import { TILE_SIZE } from '../../styles/constants';

export class Camera {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // 更新攝像頭位置，讓玩家在畫面中心
  update(playerX, playerY, canvasRef, mapWidth, mapHeight) {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const viewWidth = Math.floor(rect.width / TILE_SIZE);
    const viewHeight = Math.floor(rect.height / TILE_SIZE);
    
    // 計算攝像頭位置，讓玩家在中心
    let camX = playerX - Math.floor(viewWidth / 2);
    let camY = playerY - Math.floor(viewHeight / 2);
    
    // 限制攝像頭不超出地圖邊界
    camX = Math.max(0, Math.min(camX, mapWidth - viewWidth));
    camY = Math.max(0, Math.min(camY, mapHeight - viewHeight));
    
    this.x = camX;
    this.y = camY;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}