import React from 'react';
import { GBAScreen as StyledGBAScreen } from '../styles/styledComponents';

const GBAScreen = ({ children }) => {
  return (
    <StyledGBAScreen>
      {children}
    </StyledGBAScreen>
  );
};

export default GBAScreen;