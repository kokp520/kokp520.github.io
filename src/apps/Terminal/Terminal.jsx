import React, { useState, useRef, useEffect } from 'react';
import TerminalInput from './TerminalInput';
import TerminalOutput from './TerminalOutput';
import { useTerminalCommands } from './commands';
import './terminal.css';

function Terminal() {
  const welcome = `
\n\n
       ___         ___         ___   
      /   |       /    |       /    | 
    / /| |     / /| |      / /| | 
  / ___ |    / ___ |    / ___ | 
/_/     |_ /_/     |_ /_/  |_| 

Welcome to adi terminal!\nlast login: ${new Date().toLocaleString()}\ntype 'help' to see commands\n`;
  const [lines, setLines] = useState([
    { type: 'output', value: welcome }
  ]);
  const [fadingOut, setFadingOut] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null);
  const outputAreaRef = useRef(null);

  const { handleCommand } = useTerminalCommands();

  useEffect(() => {
    if (outputAreaRef.current) {
      outputAreaRef.current.scrollTop = outputAreaRef.current.scrollHeight;
    }
  }, [lines]);

  const onCommand = (input) => {
    if (input.trim() === 'clear') {
      setFadingOut(true);
      return;
    }
    
    if (input.trim() === 'history') {
      setLines(prev => [...prev, { type: 'input', value: input }]);
      const historyText = history.length > 0 
        ? history.map((cmd, idx) => `${idx + 1}  ${cmd}`).join('\n')
        : '命令歷史為空';
      setLines(prev => [...prev, { type: 'output', value: historyText }]);
      setHistory(prev => [...prev, input]);
      setHistoryIndex(null);
      return;
    }
    
    setLines(prev => [...prev, { type: 'input', value: input }]);
    const output = handleCommand(input, setLines, history);
    if (output) {
      setLines(prev => [...prev, { type: 'output', value: output }]);
    }
    setHistory(prev => [...prev, input]);
    setHistoryIndex(null);
  };

  const handleFadeOutEnd = () => {
    setLines([
      { type: 'output', value: '\n\n' },
    ]);
    setFadingOut(false);
  };

  const onHistoryNav = (direction) => {
    if (history.length === 0) return '';
    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = newIndex === null ? history.length - 1 : Math.max(0, newIndex - 1);
    } else {
      newIndex = newIndex === null ? null : (newIndex < history.length - 1 ? newIndex + 1 : null);
    }
    setHistoryIndex(newIndex);
    return newIndex !== null ? history[newIndex] : '';
  };

  return (
    <div
      className="terminal-container"
      onClick={() => inputRef.current && inputRef.current.focus()}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className="terminal-output-area" ref={outputAreaRef}>
        {lines.map((line, idx) => (
          <TerminalOutput
            key={idx}
            line={line}
            fadingOut={fadingOut}
            onFadeOut={fadingOut && idx === lines.length - 1 ? handleFadeOutEnd : undefined}
          />
        ))}
      </div>
      <TerminalInput onCommand={onCommand} onHistoryNav={onHistoryNav} inputRef={inputRef} />
    </div>
  );
}

export default Terminal; 