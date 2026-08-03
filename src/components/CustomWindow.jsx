import styled from 'styled-components';

const CustomWindow = styled.div`
  background: #000000;
  border: 2px solid #ffffff;
  border-radius: 0px;
  box-shadow: 4px 4px 0px #ffffff;
  padding: 0;
  overflow: hidden;
  position: relative;
  transition: none;

  &:hover {
    box-shadow: 6px 6px 0px #ffffff;
  }
`;

export default CustomWindow; 