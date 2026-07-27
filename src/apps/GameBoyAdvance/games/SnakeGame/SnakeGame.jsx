import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { SnakeGame as StyledSnakeGame, SnakeCanvas } from '../../styles/styledComponents';
import { SnakeLogic } from './snakeLogic';

const SnakeGame = forwardRef(({ onExit }, ref) => {
  const canvasRef = useRef(null);
  const [snakeLogic] = useState(new SnakeLogic());
  const [gameRunning, setGameRunning] = useState(true);
  const [score, setScore] = useState(0);

  // 重置遊戲
  const resetGame = () => {
    snakeLogic.resetGame();
    setGameRunning(true);
    setScore(0);
  };

  // 設置方向
  const setDirection = (direction) => {
    snakeLogic.setDirection(direction);
  };

  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    setDirection,
    gameRunning,
    setGameRunning,
    score
  }));

  // 遊戲與渲染循環 (使用 requestAnimationFrame 代替 setInterval)
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const speed = snakeLogic.getGameSpeed();
      if (currentTime - lastTime >= speed) {
        if (gameRunning) {
          snakeLogic.update();
          setScore(snakeLogic.score);

          if (!snakeLogic.gameRunning) {
            setGameRunning(false);
          }
        }
        lastTime = currentTime;
      }

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        snakeLogic.draw(ctx, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [gameRunning, snakeLogic]);

  return (
    <StyledSnakeGame>
      <div style={{ 
        color: '#ffffff', 
        fontSize: '8px', 
        marginBottom: '4px',
        fontFamily: 'Courier New, monospace',
        fontWeight: 'bold',
        textShadow: '1px 1px 0px #000000'
      }}>
        ▲ Snake - Score: {score} ▲
      </div>
      
      <SnakeCanvas ref={canvasRef} width="120" height="80" />
      
      <div style={{
        fontSize: '7px',
        color: '#ffffff',
        fontFamily: 'Courier New, monospace',
        marginTop: '2px',
        textShadow: '1px 1px 0px #000000'
      }}>
        WASD: move | ESC: back to world
      </div>
      
      {!gameRunning && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid #000000',
          padding: '8px',
          fontSize: '8px',
          fontFamily: 'Courier New, monospace',
          fontWeight: 'bold',
          color: '#000000',
          textAlign: 'center',
          borderRadius: '4px'
        }}>
          GAME OVER!<br />
          Score: {score}<br />
          Press ESC Back to World
        </div>
      )}
    </StyledSnakeGame>
  );
});

export default SnakeGame;