import styled, { createGlobalStyle, keyframes } from "styled-components";

// 粒子動畫
const move = keyframes`
  0% { transform: translate(var(--x-start), var(--y-start)); }
  100% { transform: translate(var(--x-end), var(--y-end)); }
`;

// 粒子容器
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

// 單一粒子
const Particle = styled.div`
  position: absolute;
  background-color: #00aaff;
  border-radius: 50%;
  animation: ${move} linear infinite;
  opacity: 0;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  top: 0; /* Changed from var(--top) to be relative to the container */
  left: 0; /* Changed from var(--left) to be relative to the container */

  @keyframes move {
    0% {
      transform: translate(var(--x-start), var(--y-start)) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(0);
      opacity: 0;
    }
  }
`;

// 建立粒子的輔助函式
const createParticles = (num) => {
  const particles = [];
  for (let i = 0; i < num; i++) {
    const duration = Math.random() * 20 + 10; // 10-30s
    const delay = Math.random() * -duration; // Start at a random point in the animation
    const size = Math.random() * 3 + 2; // 2-5px
    const xStart = `${Math.random() * 100}vw`;
    const yStart = `${Math.random() * 100}vh`;
    const xEnd = `${Math.random() * 100}vw`;
    const yEnd = `${Math.random() * 100}vh`;

    const style = {
      '--duration': `${duration}s`,
      '--delay': `${delay}s`,
      '--size': `${size}px`,
      '--x-start': xStart,
      '--y-start': yStart,
      '--x-end': xEnd,
      '--y-end': yEnd,
    };
    particles.push(<Particle key={i} style={style} />);
  }
  return particles;
};

export const Particles = () => {
    return <ParticlesContainer>{createParticles(20)}</ParticlesContainer>;
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cubic_11';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-display: swap;
  }

  :root {
    --color-bg: #000000;
    --color-card: #000000;
    --color-primary: #ffffff;
    --color-text: #ffffff;
    --color-border: #ffffff;

    --font-pixel: 'Press Start 2P', cursive;
    --font-terminal: 'VT323', monospace;
    --font-mono: 'DotGothic16', 'JetBrains Mono', 'Cubic_11', monospace;
  }

  body {
    font-family: var(--font-mono);
    background: #000000;
    color: #ffffff;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    image-rendering: pixelated;
    -webkit-font-smoothing: none;
  }

  /* 1-Bit Macintosh Title Bar Overrides */
  .title-bar.xp {
    background: #ffffff !important;
    color: #000000 !important;
    border-bottom: 2px solid #000000 !important;
    font-family: var(--font-terminal);
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: bold;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// CRT 螢幕外框 - 1-Bit Edition
const CRTFrame = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CRTVignette = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(ellipse 85% 85% at 50% 50%, transparent 70%, rgba(0,0,0,0.6) 100%);
`;

const CRTScreen = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  box-shadow: 0 0 0 8px #000 inset;
  overflow: hidden;
  position: relative;
  background: #000;
`;

const CRTReflection = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
  background: none;
`;

const CRTScanlines = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.06) 0px,
    rgba(255,255,255,0.06) 1px,
    transparent 2px,
    transparent 4px
  );
`;

export const CRTBackground = createGlobalStyle`
  body {
    background-color: #000000;
    /* 1-Bit Dither Checkered Background */
    background-image: radial-gradient(#ffffff 1px, transparent 0);
    background-size: 4px 4px;
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    overflow-x: hidden;
  }
`;

// 桌面 icon 容器，讓 icon 自動換行
export const DesktopIconsContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 8px 0 0 16px;
  z-index: 2;
  pointer-events: none;

  & > * {
    pointer-events: auto;
    margin: 0 24px 8px 0;
    width: 80px;
  }
`;

export {
  CRTFrame,
  CRTVignette,
  CRTScreen,
  CRTReflection,
  CRTScanlines
};