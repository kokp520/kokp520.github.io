import { keyframes } from 'styled-components';

// GBA 開機動畫
export const powerOn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

// 螢幕發光效果
export const screenGlow = keyframes`
  0%, 100% { box-shadow: inset 0 0 20px rgba(100, 149, 237, 0.3); }
  50% { box-shadow: inset 0 0 30px rgba(100, 149, 237, 0.5); }
`;

// 紙質紋理動畫
export const paperTexture = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

// 打字機閃爍效果
export const typewriterBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

// 打字震動效果
export const typingShake = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
`;