import React from 'react';
import { GBABody as StyledGBABody, PowerLED } from '../styles/styledComponents';

const GBABody = ({ scale, children }) => {
  return (
    <StyledGBABody scale={scale}>
      <PowerLED />
      {children}
    </StyledGBABody>
  );
};

export default GBABody;