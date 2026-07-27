import { useState } from 'react';
import { GAME_STATES } from '../styles/constants';

export const useGameState = () => {
  const [gameState, setGameState] = useState(GAME_STATES.OPENING);

  const goToWorld = () => setGameState(GAME_STATES.WORLD);
  const goToSnake = () => setGameState(GAME_STATES.SNAKE);
  const goToOpening = () => setGameState(GAME_STATES.OPENING);

  return {
    gameState,
    setGameState,
    goToWorld,
    goToSnake,
    goToOpening,
    isOpening: gameState === GAME_STATES.OPENING,
    isWorld: gameState === GAME_STATES.WORLD,
    isSnake: gameState === GAME_STATES.SNAKE
  };
};