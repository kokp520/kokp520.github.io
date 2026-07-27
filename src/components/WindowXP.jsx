import React from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { useSound, useClickSound } from "./ClickSoundContext";
import CustomWindow from "./CustomWindow";

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #222;
  color: #fff;
  padding: 0 12px;
  height:24px;
  font-size: 1.1rem;
  border-bottom: 1px solid #ddd;
`;

const TitleBarText = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const TitleBarControls = styled.div`
  display: flex;
  align-items: center;
  button {
    background: #ff5f56;
    border: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin-left: 8px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #ff2d1a;
    }
    &:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  }
`;

const WindowBody = styled.div`
  padding: 10px 8px;
  height: calc(100% - 24px);
  max-height: calc(100% - 24px);
  overflow-y: hidden;
  overflow-x: hidden;
  background: #f8f8f8;
  &::-webkit-scrollbar {
    width: 8px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1px;
  }
  font-size: 12px;
`;

const CustomWindowFrame = ({ icon, title, children, onClose, defaultSize = { x: 100, y: 100, width: 320, height: 200 } }) => {
  const playClick = useClickSound();
  const { playCancel } = useSound();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const mobileSize = isMobile
    ? {
        x: 10,
        y: 38,
        width: Math.min(window.innerWidth - 20, 380),
        height: Math.min(window.innerHeight - 80, 520)
      }
    : defaultSize;

  return (
    <Rnd
      default={mobileSize}
      position={isMobile ? { x: 10, y: 38 } : undefined}
      size={isMobile ? { width: Math.min(window.innerWidth - 20, 380), height: Math.min(window.innerHeight - 80, 520) } : undefined}
      minWidth={200}
      minHeight={100}
      disableDragging={isMobile}
      enableResizing={!isMobile}
    >
      <CustomWindow style={{ width: "100%", height: "100%" }}>
        <TitleBar onMouseDown={() => {
          try {
            playClick();
          } catch (error) {
            console.warn('Title bar click sound error (handled):', error.message);
          }
        }}>
          <TitleBarText>
            {icon && (
              <img 
                src={icon} 
                alt="" 
                width="18" 
                height="18" 
                aria-hidden="true" 
                style={{ marginRight: 8, verticalAlign: 'middle' }} 
              />
            )}
            {title}
          </TitleBarText>
          <TitleBarControls>
            <button aria-label={`Close ${title} window`} onClick={() => { 
              try {
                playCancel();
              } catch (error) {
                console.warn('Close button sound error (handled):', error.message);
              }
              onClose && onClose(); 
            }} />
          </TitleBarControls>
        </TitleBar>
        <WindowBody>
          {children}
        </WindowBody>
      </CustomWindow>
    </Rnd>
  );
};

export default CustomWindowFrame; 