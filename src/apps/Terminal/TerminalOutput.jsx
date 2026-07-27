import React, { useEffect, useState } from 'react';
import { useFileSystem } from '../FileSystemContext';

function TerminalOutput({ line, onFadeOut, fadingOut }) {
  const [fadeClass, setFadeClass] = useState('fade-in');
  const { currentPath } = useFileSystem();

  useEffect(() => {
    // 淡入動畫結束後移除 class
    if (fadeClass === 'fade-in') {
      const timer = setTimeout(() => setFadeClass(''), 500);
      return () => clearTimeout(timer);
    }
    // 淡出動畫結束後通知父層移除
    if (fadeClass === 'fade-out') {
      const timer = setTimeout(() => onFadeOut && onFadeOut(), 500);
      return () => clearTimeout(timer);
    }
  }, [fadeClass, onFadeOut]);

  useEffect(() => {
    if (fadingOut) setFadeClass('fade-out');
  }, [fadingOut]);

  if (line.type === 'input') {
    return <div className={`terminal-line ${fadeClass}`}><span className="terminal-prompt">{currentPath.join('/')} </span> {line.value}</div>;
  }
  return <div className={`terminal-line ${fadeClass}`}>{line.value}</div>;
}

export default TerminalOutput; 