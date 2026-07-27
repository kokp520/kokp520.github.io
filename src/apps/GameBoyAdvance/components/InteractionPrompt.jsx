import React from 'react';
import { InteractionPrompt as StyledInteractionPrompt } from '../styles/styledComponents';

const InteractionPrompt = ({ show, message = "按 Space 使用電腦" }) => {
  if (!show) return null;

  return (
    <StyledInteractionPrompt>
      {message}
    </StyledInteractionPrompt>
  );
};

export default InteractionPrompt;