import React, { useState } from 'react';
import styled from 'styled-components';
import { useClickSound } from './ClickSoundContext';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 5px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  filter: ${props => (props.disabled ? 'grayscale(100%)' : 'none')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  border-radius: 4px;
  outline: none;
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
`;

function DesktopIcon({ icon, label, onDoubleClick, disabled = false }) {
  const [selected, setSelected] = useState(false);
  const playClickSound = useClickSound();

  const handleDoubleClick = () => {
    if (!disabled) {
      if (onDoubleClick) {
        onDoubleClick();
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      setSelected(true);
      try {
        playClickSound();
      } catch (error) {
        // Silently handle click sound errors
        console.warn('Click sound error (handled):', error.message);
      }
    }
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <IconWrapper 
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex={0}
      disabled={disabled}
      selected={selected}
    >
      <IconImage src={icon} alt={label} />
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  );
}

export default DesktopIcon; 