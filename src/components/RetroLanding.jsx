import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const crtGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 204, 0.8), 0 0 20px rgba(0, 255, 204, 0.4); }
  50% { text-shadow: 0 0 15px rgba(0, 255, 204, 1), 0 0 30px rgba(0, 255, 204, 0.7); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const LandingContainer = styled.div`
  width: 100%;
  min-height: 200vh;
  background: #0a0c10;
  color: #00ffcc;
  font-family: 'Cubic_11', 'Courier New', monospace;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background: radial-gradient(circle at center, #151a24 0%, #080a0e 100%);
`;

const ScanlinesOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
`;

const ScanLineMove = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(0, 255, 204, 0),
    rgba(0, 255, 204, 0.08),
    rgba(0, 255, 204, 0)
  );
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
  z-index: 11;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid #00ffcc;
  border-radius: 20px;
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 24px;
  background: rgba(0, 255, 204, 0.08);
  box-shadow: 0 0 12px rgba(0, 255, 204, 0.2);
  color: #00ffcc;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0 0 16px 0;
  letter-spacing: 3px;
  color: #ffffff;
  animation: ${crtGlow} 3s infinite;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  color: #8a99ad;
  max-width: 650px;
  line-height: 1.6;
  margin: 0 0 36px 0;
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 700px;
  margin-bottom: 44px;
`;

const FeatureTag = styled.span`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 255, 204, 0.25);
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #b0c4de;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BootButton = styled.button`
  background: linear-gradient(135deg, #00ffcc 0%, #0099ff 100%);
  color: #000;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 16px 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(0, 255, 204, 0.5);
  transition: all 0.25s ease;
  animation: ${pulse} 2.5s infinite ease-in-out;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 0 40px rgba(0, 255, 204, 0.8);
    background: linear-gradient(135deg, #33ffd6 0%, #33adff 100%);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ScrollHint = styled.div`
  margin-top: 32px;
  font-size: 0.85rem;
  color: #5a6e85;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ScrollTriggerArea = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
`;

export default function RetroLanding({ onBoot }) {
  const containerRef = useRef(null);
  const [hasBooted, setHasBooted] = useState(false);

  const handleBootTrigger = () => {
    if (hasBooted) return;
    setHasBooted(true);
    onBoot();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hasBooted) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Trigger boot when user scrolls past 30% of hero height
      if (scrollY > windowHeight * 0.3) {
        handleBootTrigger();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBooted]);

  return (
    <LandingContainer ref={containerRef}>
      <ScanlinesOverlay />
      <ScanLineMove />

      <HeroSection>
        <Badge>RETRO PC SYSTEM // v2.0</Badge>
        <Title>adi.tw RetroPC</Title>
        <Subtitle>
          歡迎來到 90 年代懷舊 Web 桌面作業系統！體驗擬真視窗、多工具、GBA 遊戲與即時通系統。
        </Subtitle>

        <FeatureGrid>
          <FeatureTag>🕹️ GBA 遊戲模擬器</FeatureTag>
          <FeatureTag>💬 Yahoo 即時通</FeatureTag>
          <FeatureTag>🎵 千千靜聽 MP3</FeatureTag>
          <FeatureTag>📸 CCD 復古相機</FeatureTag>
          <FeatureTag>🛠️ 開發者工具箱</FeatureTag>
        </FeatureGrid>

        <BootButton onClick={handleBootTrigger}>
          <span>⚡</span> BOOT RETRO PC 啟動系統
        </BootButton>

        <ScrollHint>
          <span>▼ 向下滾動或點擊按鈕直接開機</span>
        </ScrollHint>
      </HeroSection>

      <ScrollTriggerArea />
    </LandingContainer>
  );
}
