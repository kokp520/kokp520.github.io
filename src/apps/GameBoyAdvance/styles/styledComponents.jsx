import styled, { css } from 'styled-components';
import { powerOn, screenGlow } from './animations';

// GBA 主體 - 使用 PNG 背景
export const GBABody = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${props => props.scale * 480}px;
  max-height: ${props => props.scale * 320}px;
  background: url('/assets/gba/gba-interface.png') no-repeat center center;
  background-size: contain;
  position: relative;
  animation: ${css`${powerOn} 1s ease-out`};
  overflow: hidden;
  
  /* 確保圖片完整顯示 */
  aspect-ratio: 480/320;
  transform: scale(${props => props.scale});
  transform-origin: center center;
`;

// 電源指示燈
export const PowerLED = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  width: 5px;
  height: 5px;
  background: #0f0;
  border-radius: 50%;
  box-shadow: 0 0 6px #0f0;
  animation: ${css`${screenGlow} 2s infinite`};
`;

// GBA 螢幕 - 定位到 PNG 中的螢幕位置
export const GBAScreen = styled.div`
  position: absolute;
  top: 26%;
  left: 49%;
  transform: translateX(-50%);
  width: 36%;
  height: 40%;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  
  /* 確保螢幕內容完整顯示 */
  z-index: 10;
`;

// 遊戲內容容器
export const GameContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

// 遊戲影片
export const GameVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 貪吃蛇遊戲容器
export const SnakeGame = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// 貪吃蛇畫布
export const SnakeCanvas = styled.canvas`
  border: 1px solid #fff;
  background: #f1f8e9;
  image-rendering: pixelated;
`;

// 互動提示
export const InteractionPrompt = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 8px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-align: center;
  z-index: 20;
  animation: ${css`${powerOn} 0.3s ease-out`};
`;

// 縮放控制器
export const SizeController = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// 縮放按鈕
export const SizeButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 2px 6px;
  font-size: 10px;
  cursor: pointer;
  min-width: 20px;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &:active {
    background: #d0d0d0;
  }
`;

// 縮放顯示
export const SizeDisplay = styled.span`
  font-size: 9px;
  color: #333;
  margin: 0 4px;
`;