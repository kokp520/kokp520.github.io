import { TILE_SIZE, COLORS } from '../../styles/constants';
import { TILE_TYPES } from '../../data/mapData';

export class MapRenderer {
  // 使用黑色線條繪製不同類型的物件
  static drawTile(ctx, tileType, x, y, width, height) {
    ctx.strokeStyle = COLORS.STROKE;
    ctx.lineWidth = 1;
    ctx.fillStyle = COLORS.WHITE;
    
    switch (tileType) {
      case 'WALL':
        // 牆壁 - 實心黑色方塊
        ctx.fillStyle = COLORS.STROKE;
        ctx.fillRect(x, y, width, height);
        break;
        
      case 'WOOD_FLOOR':
        // 木地板 - 淡色背景
        ctx.fillStyle = COLORS.WOOD_FLOOR;
        ctx.fillRect(x, y, width, height);
        break;
        
      case 'CARPET_RED':
        // 紅地毯 - 紅色背景
        ctx.fillStyle = COLORS.CARPET_RED;
        ctx.fillRect(x, y, width, height);
        break;
        
      case 'WINDOW':
        // 窗戶 - 方框內有十字
        ctx.fillStyle = COLORS.WINDOW;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.beginPath();
        ctx.moveTo(x + width/2, y);
        ctx.lineTo(x + width/2, y + height);
        ctx.moveTo(x, y + height/2);
        ctx.lineTo(x + width, y + height/2);
        ctx.stroke();
        break;
        
      case 'DOOR':
        // 門 - 帶把手的矩形
        ctx.fillStyle = COLORS.DOOR;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = COLORS.STROKE;
        ctx.fillRect(x + width - 2, y + height/2 - 1, 1, 2);
        break;
        
      case 'BOOKSHELF':
        // 書櫃 - 多層架子
        ctx.strokeRect(x, y, width, height);
        for (let i = 1; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(x, y + (height/4) * i);
          ctx.lineTo(x + width, y + (height/4) * i);
          ctx.stroke();
        }
        break;
        
      case 'CHAIR':
        // 椅子 - 簡單的座椅形狀
        ctx.strokeRect(x + 1, y + 2, width - 2, height - 4);
        ctx.beginPath();
        ctx.moveTo(x + 1, y + 2);
        ctx.lineTo(x + 1, y);
        ctx.moveTo(x + width - 1, y + 2);
        ctx.lineTo(x + width - 1, y);
        ctx.stroke();
        break;
        
      case 'TABLE':
        // 桌子 - 桌面加腿
        ctx.strokeRect(x, y + 2, width, height - 4);
        ctx.beginPath();
        ctx.moveTo(x + 1, y + 2);
        ctx.lineTo(x + 1, y + height);
        ctx.moveTo(x + width - 1, y + 2);
        ctx.lineTo(x + width - 1, y + height);
        ctx.stroke();
        break;
        
      case 'BED':
        // 床 - 矩形帶枕頭
        ctx.strokeRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height/3);
        break;
        
      case 'COMPUTER':
        // 電腦 - 螢幕形狀
        ctx.strokeRect(x, y, width, height - 2);
        ctx.strokeRect(x + 2, y + height - 2, width - 4, 2);
        break;
        
      case 'SOFA':
        // 沙發 - 帶扶手的座椅
        ctx.strokeRect(x, y + 2, width, height - 2);
        ctx.strokeRect(x, y, 2, height);
        ctx.strokeRect(x + width - 2, y, 2, height);
        break;
        
      case 'PLANT_BIG':
        // 大植物 - 花盆加植物
        ctx.strokeRect(x + 2, y + height - 3, width - 4, 3);
        ctx.beginPath();
        ctx.moveTo(x + width/2, y + height - 3);
        ctx.lineTo(x + width/2, y + 1);
        ctx.moveTo(x + 1, y + 2);
        ctx.lineTo(x + width - 1, y + 2);
        ctx.stroke();
        break;
        
      case 'TV':
        // 電視 - 大螢幕
        ctx.strokeRect(x, y, width, height);
        ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);
        break;
        
      case 'CHEST':
        // 箱子 - 帶蓋子的盒子
        ctx.strokeRect(x, y + 1, width, height - 1);
        ctx.strokeRect(x, y, width, 2);
        break;
        
      default:
        // 預設 - 簡單方框
        ctx.strokeRect(x, y, width, height);
        break;
    }
  }

  // 渲染整個地圖
  static renderMap(ctx, mapData, camera, canvasWidth, canvasHeight) {
    // 清除畫布 - 使用深色背景
    ctx.fillStyle = COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    const viewWidth = Math.floor(canvasWidth / TILE_SIZE);
    const viewHeight = Math.floor(canvasHeight / TILE_SIZE);
    
    // 繪製可見範圍內的地圖
    for (let viewY = 0; viewY < viewHeight; viewY++) {
      for (let viewX = 0; viewX < viewWidth; viewX++) {
        const mapX = camera.x + viewX;
        const mapY = camera.y + viewY;
        
        // 檢查是否在地圖範圍內
        if (mapX >= 0 && mapX < mapData.width && mapY >= 0 && mapY < mapData.height) {
          const tileType = mapData.tiles[mapY][mapX];
          const tileConfig = TILE_TYPES[tileType];
          
          if (tileConfig) {
            this.drawTile(ctx, tileType, viewX * TILE_SIZE, viewY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
  }
}