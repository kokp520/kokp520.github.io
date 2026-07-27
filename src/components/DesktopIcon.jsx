import React, { useState } from 'react';
import styled from 'styled-components';
import { useClickSound } from './ClickSoundContext';

const IconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 5px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  border: none;
  background: transparent;
  filter: ${props => (props.disabled ? 'grayscale(100%)' : 'none')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
`;

const IconLabel = styled.span`
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  word-break: break-word;
  min-width: 0;
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