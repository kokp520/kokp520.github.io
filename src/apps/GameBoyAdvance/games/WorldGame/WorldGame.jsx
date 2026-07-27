import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { SnakeCanvas } from '../../styles/styledComponents';
import { TILE_SIZE, DIRECTIONS } from '../../styles/constants';
import { mapData, TILE_TYPES } from '../../data/mapData';
import { Player } from './Player';
import { Camera } from './Camera';
import { MapRenderer } from './MapRenderer';
import { INITIAL_PLAYER_STATE, INITIAL_MAP, INITIAL_CAMERA } from './constants';
import InteractionPrompt from '../../components/InteractionPrompt';

const WorldGame = forwardRef(({ onComputerInteract, onPlayerMove }, ref) => {
  const canvasRef = useRef(null);
  
  // 玩家狀態
  const [player, setPlayer] = useState(new Player(INITIAL_PLAYER_STATE.x, INITIAL_PLAYER_STATE.y, INITIAL_PLAYER_STATE.direction));
  const [currentMap, setCurrentMap] = useState(INITIAL_MAP);
  
  // 攝像頭系統
  const [camera, setCamera] = useState(new Camera(INITIAL_CAMERA.x, INITIAL_CAMERA.y));
  
  // 電腦互動狀態
  const [nearComputer, setNearComputer] = useState(false);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);

  // 檢查玩家是否靠近電腦
  useEffect(() => {
    const map = mapData[currentMap];
    const computer = map.computer;
    const distance = Math.abs(player.x - computer.x) + Math.abs(player.y - computer.y);
    const isNear = distance <= 1;
    
    setNearComputer(isNear);
    setShowInteractionPrompt(isNear);
  }, [player, currentMap]);

  // 更新攝像頭位置
  const updateCamera = (playerX, playerY) => {
    const map = mapData[currentMap];
    const newCamera = new Camera(camera.x, camera.y);
    newCamera.update(playerX, playerY, canvasRef, map.width, map.height);
    setCamera(newCamera);
  };

  // 玩家移動邏輯
  const movePlayer = (dx, dy) => {
    const map = mapData[currentMap];
    const newX = player.x + dx;
    const newY = player.y + dy;
    
    // 檢查邊界
    if (newX < 0 || newX >= map.width || newY < 0 || newY >= map.height) {
      return;
    }
    
    // 碰撞檢測
    const tileType = map.tiles[newY][newX];
    const tileConfig = TILE_TYPES[tileType];
    
    if (!tileConfig || !tileConfig.walkable) {
      return;
    }

    // 更新玩家位置和方向
    const newPlayer = new Player(newX, newY, player.direction);
    if (dx > 0) newPlayer.setDirection(DIRECTIONS.RIGHT);
    else if (dx < 0) newPlayer.setDirection(DIRECTIONS.LEFT);
    else if (dy > 0) newPlayer.setDirection(DIRECTIONS.DOWN);
    else if (dy < 0) newPlayer.setDirection(DIRECTIONS.UP);
    
    setPlayer(newPlayer);
    updateCamera(newX, newY);
  };

  // 與電腦互動
  const interactWithComputer = () => {
    if (nearComputer) {
      onComputerInteract();
    }
  };

  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    movePlayer,
    interactWithComputer,
    player,
    nearComputer
  }));

  // 渲染與鏡頭循環
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const map = mapData[currentMap];

        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }

        MapRenderer.renderMap(ctx, map, camera, canvas.width, canvas.height);

        const playerScreenX = (player.x - camera.x) * TILE_SIZE;
        const playerScreenY = (player.y - camera.y) * TILE_SIZE;
        player.draw(ctx, playerScreenX, playerScreenY, TILE_SIZE);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [player, camera, currentMap]);

  // 監聽窗口大小變化
  useEffect(() => {
    const handleResize = () => {
      updateCamera(player.x, player.y);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [player]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      background: '#2c2c2c',
      position: 'relative',
      imageRendering: 'pixelated'
    }}>
      <SnakeCanvas 
        ref={canvasRef} 
        width="100%" 
        height="100%" 
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }} 
      />
      
      {/* 遊戲說明 */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        fontSize: '7px',
        color: '#ffffff',
        fontFamily: 'Courier New, monospace',
        textShadow: '1px 1px 0px #000000',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '4px 8px',
        borderRadius: '4px'
      }}>
        WASD: move | space/Enter: 互動
      </div>
      
      <InteractionPrompt show={showInteractionPrompt} />
    </div>
  );
});

export default WorldGame;