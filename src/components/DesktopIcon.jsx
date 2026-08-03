import React, { useState } from 'react';
import styled from 'styled-components';
import { useClickSound } from './ClickSoundContext';

const IconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 8px 5px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  border: 2px solid ${props => props.selected ? '#ffffff' : 'transparent'};
  background: ${props => props.selected ? '#ffffff' : 'transparent'};
  color: ${props => props.selected ? '#000000' : '#ffffff'};
  filter: ${props => (props.disabled ? 'grayscale(100%)' : 'none')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  border-radius: 0px;
  transition: none;

  &:hover {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #000000;
  }

  &:hover span {
    color: #000000;
    text-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
  image-rendering: pixelated;
`;

const IconLabel = styled.span`
  color: #ffffff;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  text-align: center;
  margin-top: 6px;
  word-break: break-word;
  min-width: 0;
  letter-spacing: 0.5px;
`;

function DesktopIcon({ icon, label, onDoubleClick, disabled = false }) {
  const [selected, setSelected] = useState(false);
  const playClickSound = useClickSound();

  const handleDoubleClick = () => {
    if (!disabled && onDoubleClick) {
      onDoubleClick();
    }
  };

  const handleClick = () => {
    if (!disabled) {
      setSelected(true);
      try {
        playClickSound();
      } catch (error) {
        console.warn('Click sound error (handled):', error.message);
      }
      
      // 在行動裝置觸控或小螢幕下，單擊即可直接開啟 App
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        if (onDoubleClick) {
          onDoubleClick();
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
      handleDoubleClick();
    }
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <IconWrapper 
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      disabled={disabled}
      selected={selected}
      aria-label={label}
    >
      <IconImage src={icon} alt="" width="48" height="48" aria-hidden="true" />
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  );
}

export default DesktopIcon; 