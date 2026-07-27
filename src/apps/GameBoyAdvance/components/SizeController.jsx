import React from 'react';
import { SizeController as StyledSizeController, SizeButton, SizeDisplay } from '../styles/styledComponents';

const SizeController = ({ scale, scaleUp, scaleDown }) => {
  return (
    <StyledSizeController>
      <SizeButton onClick={scaleDown}>-</SizeButton>
      <SizeDisplay>{Math.round(scale * 100)}%</SizeDisplay>
      <SizeButton onClick={scaleUp}>+</SizeButton>
    </StyledSizeController>
  );
};

export default SizeController;