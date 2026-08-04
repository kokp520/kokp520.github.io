import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const powerOn = keyframes`
  0% {
    transform: scale(1, 0.002);
    filter: brightness(10);
    opacity: 1;
  }
  35% {
    transform: scale(1, 0.005);
    filter: brightness(8);
  }
  70% {
    transform: scale(1, 1);
    filter: brightness(1.5);
  }
  100% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
`;

const CRTOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00ff00;
  font-family: 'Cubic_11', 'Courier New', monospace;
  animation: ${powerOn} 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  pointer-events: none;
`;

const TerminalBox = styled.div`
  width: 80%;
  max-width: 600px;
  font-size: 0.95rem;
  line-height: 1.8;
`;

export default function CrtBootAnimation({ onComplete }) {
  const [logs, setLines] = useState([
    "INITIALIZING SYSTEM BIOS v3.2...",
    "MEMORY TEST: 640K OK",
    "CHECKING HARDWARE DEVICES...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "LOADING RETRO PC DESKTOP ENVIRONMENT..."
  ]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < logs.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, logs.length, onComplete]);

  return (
    <CRTOverlay>
      <TerminalBox>
        {logs.slice(0, currentLineIndex + 1).map((log, idx) => (
          <div key={idx}>&gt; {log}</div>
        ))}
      </TerminalBox>
    </CRTOverlay>
  );
}
