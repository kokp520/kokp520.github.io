import { useState } from 'react';
import { MIN_SCALE, MAX_SCALE, SCALE_STEP } from '../styles/constants';

export const useScale = (initialScale = 1) => {
  const [scale, setScale] = useState(initialScale);

  const handleScaleChange = (newScale) => {
    setScale(Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)));
  };

  const scaleUp = () => handleScaleChange(scale + SCALE_STEP);
  const scaleDown = () => handleScaleChange(scale - SCALE_STEP);

  return {
    scale,
    setScale,
    handleScaleChange,
    scaleUp,
    scaleDown
  };
};