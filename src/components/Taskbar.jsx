import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import Clock from "./Clock";

// 8-bit 地板背景
const Bar = styled.div`
  position: fixed;
  left: 0; bottom: 0;
  width: 100vw;
  height: 100px;
  background: repeating-linear-gradient(
    to right,
    #222 0 8px, #333 8px 16px
  ), linear-gradient(180deg, #444 60%, #222 100%);
  border-top: 2px solid #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 0 32px 0 #000a;
`;

// 寵物左右走動動畫
const walkAnim = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(40px); }
  50% { transform: translateX(0); }
  70% { transform: translateX(-40px); }
  100% { transform: translateX(0); }
`;

const PetContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${walkAnim} 8s linear infinite;
  cursor: pointer;
`;

const Heart = styled.div`
  position: absolute;
  left: 50%; top: -24px;
  transform: translateX(-50%);
  font-size: 24px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s;
  pointer-events: none;
`;

const MoodText = styled.div`
  font-family: 'VT323', 'Consolas', 'monospace';
  color: #fff;
  font-size: 1.2rem;
  margin-top: 2px;
  text-shadow: 0 0 2px #000, 0 0 8px #fff;
`;

const DockClock = styled.div`
  position: absolute;
  right: 32px;
  bottom: 18px;
  font-family: 'VT323', 'Consolas', 'monospace';
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 8px #fff, 0 0 2px #000;
  letter-spacing: 2px;
  z-index: 10;
`;

// 8-bit 寵物 SVG（小貓咪）
function PetSVG({ mood }) {
  // 眨眼動畫
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 3000 + Math.random() * 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <svg width="64" height="64" style={{ imageRendering: 'pixelated' }}>
      {/* 身體 */}
      <rect x="16" y="32" width="32" height="24" fill="#f9e4b7" stroke="#222" strokeWidth="2"/>
      {/* 頭 */}
      <rect x="20" y="16" width="24" height="20" fill="#f9e4b7" stroke="#222" strokeWidth="2"/>
      {/* 耳朵 */}
      <rect x="20" y="10" width="6" height="8" fill="#f9e4b7" stroke="#222" strokeWidth="2"/>
      <rect x="38" y="10" width="6" height="8" fill="#f9e4b7" stroke="#222" strokeWidth="2"/>
      {/* 臉 */}
      <rect x="28" y="24" width="4" height="4" fill="#222"/>
      <rect x="36" y="24" width="4" height="4" fill="#222"/>
      {/* 眨眼 */}
      {blink && <rect x="28" y="26" width="4" height="2" fill="#222"/>}
      {blink && <rect x="36" y="26" width="4" height="2" fill="#222"/>}
      {/* 嘴巴 */}
      <rect x="32" y="30" width="4" height="2" fill="#c96"/>
      {/* 尾巴 */}
      <rect x="46" y="44" width="10" height="4" fill="#f9e4b7" stroke="#222" strokeWidth="2"/>
      {/* 心情（開心時臉紅） */}
      {mood === '開心' && (
        <>
          <rect x="24" y="28" width="2" height="2" fill="#f88"/>
          <rect x="42" y="28" width="2" height="2" fill="#f88"/>
        </>
      )}
    </svg>
  );
}

const MOODS = ['開心', '普通', '飢餓', '想睡'];

const Taskbar = () => {
  const [mood, setMood] = useState('普通');
  const [showHeart, setShowHeart] = useState(false);

  // 餵食互動
  const feedPet = () => {
    setMood('開心');
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);
    setTimeout(() => setMood('普通'), 4000);
  };

  // 自動變心情
  useEffect(() => {
    const t = setInterval(() => {
      if (mood === '普通' && Math.random() < 0.2) setMood('飢餓');
      if (mood === '飢餓' && Math.random() < 0.2) setMood('想睡');
      if (mood === '想睡' && Math.random() < 0.2) setMood('普通');
    }, 6000);
    return () => clearInterval(t);
  }, [mood]);

  return (
    <Bar>
      <PetContainer onClick={feedPet} title='點我餵食'>
        <Heart show={showHeart}>❤️</Heart>
        <PetSVG mood={mood} />
        <MoodText>{mood}</MoodText>
      </PetContainer>
      <DockClock>
        <Clock />
      </DockClock>
    </Bar>
  );
};

export default Taskbar;