import { useEffect } from 'react';
import { GAME_STATES } from '../styles/constants';

export const useKeyboard = ({
  gameState,
  movePlayer,
  setSnakeDirection,
  snakeDirection,
  interactWithComputer,
  goToWorld,
  setGameRunning,
  nearComputer
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'arrowup':
        case 'w':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(0, -1);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.y === 0) {
            setSnakeDirection({x: 0, y: -1});
          }
          break;
        case 'arrowdown':
        case 's':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(0, 1);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.y === 0) {
            setSnakeDirection({x: 0, y: 1});
          }
          break;
        case 'arrowleft':
        case 'a':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(-1, 0);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.x === 0) {
            setSnakeDirection({x: -1, y: 0});
          }
          break;
        case 'arrowright':
        case 'd':
          if (gameState === GAME_STATES.WORLD) {
            movePlayer(1, 0);
          } else if (gameState === GAME_STATES.SNAKE && snakeDirection.x === 0) {
            setSnakeDirection({x: 1, y: 0});
          }
          break;
        case 'enter':
        case ' ':
        case 'z':
          if (gameState === GAME_STATES.WORLD && nearComputer) {
            interactWithComputer();
          }
          break;
        case 'escape':
        case 'x':
          if (gameState === GAME_STATES.SNAKE) {
            goToWorld();
            setGameRunning(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState, snakeDirection, nearComputer, movePlayer, setSnakeDirection, interactWithComputer, goToWorld, setGameRunning]);
};