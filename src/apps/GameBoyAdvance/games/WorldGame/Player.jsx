import { COLORS, DIRECTIONS } from '../../styles/constants';

export class Player {
  constructor(x, y, direction = DIRECTIONS.DOWN) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  // 繪製玩家
  draw(ctx, screenX, screenY, tileSize = 16) {
    ctx.fillStyle = COLORS.PLAYER;
    ctx.strokeStyle = COLORS.STROKE;
    ctx.lineWidth = 2;
    
    // 計算玩家大小（相對於tile大小）
    const playerSize = Math.floor(tileSize * 0.6);
    const offset = Math.floor((tileSize - playerSize) / 2);
    
    // 身體
    ctx.fillRect(screenX + offset, screenY + offset, playerSize, playerSize);
    ctx.strokeRect(screenX + offset, screenY + offset, playerSize, playerSize);
    
    // 方向指示
    ctx.fillStyle = COLORS.STROKE;
    const indicatorSize = Math.floor(tileSize * 0.2);
    
    switch (this.direction) {
      case DIRECTIONS.UP:
        ctx.fillRect(screenX + offset + playerSize/2 - indicatorSize/2, screenY + offset - indicatorSize, indicatorSize, indicatorSize);
        break;
      case DIRECTIONS.DOWN:
        ctx.fillRect(screenX + offset + playerSize/2 - indicatorSize/2, screenY + offset + playerSize, indicatorSize, indicatorSize);
        break;
      case DIRECTIONS.LEFT:
        ctx.fillRect(screenX + offset - indicatorSize, screenY + offset + playerSize/2 - indicatorSize/2, indicatorSize, indicatorSize);
        break;
      case DIRECTIONS.RIGHT:
        ctx.fillRect(screenX + offset + playerSize, screenY + offset + playerSize/2 - indicatorSize/2, indicatorSize, indicatorSize);
        break;
    }
  }
}