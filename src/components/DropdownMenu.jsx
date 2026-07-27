import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const MenuContainer = styled.div.attrs({
  className: 'dropdown-menu-container' // For outside click detection
})`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #000;
  padding: 5px ;
  min-width: 200px;
  z-index: 1000;
  font-family: 'Cubic_11', sans-serif;
  font-size: 15px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`;

const MenuItem = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${props => props.isHovered ? '#000080' : 'transparent'};
  color: ${props => {
    if (props.isHovered) return 'white';
    if (props.disabled) return '#888';
    return '#000';
  }};
  
  // Create a scanline effect for disabled items
  ${props => props.disabled && `
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 1px,
        rgba(0, 0, 0, 0.2) 2px,
        rgba(0, 0, 0, 0.2) 3px
      );
      pointer-events: none;
    }
  `}

  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const Separator = styled.div`
  height: 1px;
  border-top: 1px dotted #888;
  margin: 5px 4px;
`;

const DropdownMenu = ({ items, position, onClose }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    }
    onClose();
  };

  return ReactDOM.createPortal(
    <MenuContainer style={{ top: position.y, left: position.x }}>
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <Separator key={index} />;
        }
        return (
          <MenuItem
            key={index}
            disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            isHovered={!item.disabled && hoveredIndex === index}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </MenuContainer>,
    document.body
  );
};

export default DropdownMenu; 