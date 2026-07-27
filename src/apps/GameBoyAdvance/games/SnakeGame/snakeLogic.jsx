import { COLORS } from '../../styles/constants';

export class SnakeLogic {
  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.snake = [{ x: 5, y: 5 }];
    this.food = { x: 10, y: 8 };
    this.direction = { x: 1, y: 0 };
    this.score = 0;
    this.gameRunning = true;
  }

  setDirection(newDirection) {
    this.direction = newDirection;
  }

  generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * 15),
        y: Math.floor(Math.random() * 10)
      };
    } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    this.food = newFood;
  }

  update() {
    if (!this.gameRunning) return;

    const newSnake = [...this.snake];
    const head = { ...newSnake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;
    
    // 邊界檢查
    if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 10) {
      this.gameRunning = false;
      return;
    }
    
    // 自撞檢查
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameRunning = false;
      return;
    }
    
    newSnake.unshift(head);
    
    // 吃到食物
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.generateFood();
    } else {
      newSnake.pop();
    }
    
    this.snake = newSnake;
  }

  draw(ctx, canvasWidth, canvasHeight) {
    // 清除畫布
    ctx.fillStyle = COLORS.SNAKE_BG;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 繪製蛇
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = COLORS.SNAKE_HEAD; // 蛇頭
      } else {
        ctx.fillStyle = COLORS.SNAKE_BODY; // 蛇身
      }
      ctx.fillRect(segment.x * 8, segment.y * 8, 7, 7);
    });
    
    // 繪製食物
    ctx.fillStyle = COLORS.SNAKE_FOOD;
    ctx.fillRect(this.food.x * 8, this.food.y * 8, 7, 7);
  }

  getGameSpeed() {
    return Math.max(100, 180 - this.score);
  }
}