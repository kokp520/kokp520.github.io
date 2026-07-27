import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Typewriter';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

// 打字機動畫
const typewriterBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const paperTexture = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const typingShake = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
`;

// 打字機主體
const TypewriterBody = styled.div`
  background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
  border: 3px solid #444;
  border-radius: 20px 20px 8px 8px;
  width: 500px;
  height: 380px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(0,0,0,0.5),
    inset 0 2px 0 rgba(255,255,255,0.1),
    inset 0 -2px 0 rgba(0,0,0,0.3);
  
  /* 打字機品牌標誌 */
  &:before {
    content: 'VINTAGE WRITER';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    color: #888;
    font-size: 10px;
    font-family: 'Typewriter', monospace;
    letter-spacing: 2px;
    z-index: 10;
  }
  
  /* 打字機頂部裝飾 */
  &:after {
    content: '';
    position: absolute;
    top: 8px;
    left: 20px;
    right: 20px;
    height: 3px;
    background: linear-gradient(90deg, #666, #333, #666);
    border-radius: 2px;
    z-index: 10;
  }
`;

// 紙張區域
const PaperHolder = styled.div`
  background: linear-gradient(145deg, #333, #222);
  border: 2px solid #555;
  border-radius: 8px;
  margin: 35px 20px 10px 20px;
  padding: 15px;
  flex: 1;
  position: relative;
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.3),
    0 2px 8px rgba(0,0,0,0.2);
  
  /* 紙張滾軸裝飾 */
  &:before {
    content: '';
    position: absolute;
    top: -8px;
    left: 10px;
    right: 10px;
    height: 6px;
    background: linear-gradient(90deg, #666, #888, #666);
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 10px;
    right: 10px;
    height: 6px;
    background: linear-gradient(90deg, #666, #888, #666);
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;

// 打字紙張
const TypewriterPaper = styled.div`
  background: 
    linear-gradient(90deg, transparent 0%, transparent 3%, rgba(0,0,0,0.1) 3%, rgba(0,0,0,0.1) 3.5%, transparent 3.5%),
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 23px,
      rgba(0,100,200,0.1) 23px,
      rgba(0,100,200,0.1) 24px
    ),
    #f8f5f0;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: relative;
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.1),
    inset 0 0 20px rgba(139,69,19,0.05);
  
  /* 紙張老舊效果 */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(139,69,19,0.05) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(139,69,19,0.03) 1px, transparent 1px),
      radial-gradient(circle at 60% 20%, rgba(139,69,19,0.04) 1px, transparent 1px);
    pointer-events: none;
    border-radius: 4px;
  }
`;

// 打字機文字區域
const TypingArea = styled.textarea`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  font-family: 'Typewriter', 'Courier New', monospace;
  font-size: 14px;
  line-height: 24px;
  color: #2c3e50;
  resize: none;
  position: relative;
  z-index: 2;
  
  /* 隱藏游標，我們會自製 */
  caret-color: transparent;
  
  &::placeholder {
    color: #bbb;
    font-style: italic;
  }
  
  /* 打字時的震動效果 */
  &:focus {
    animation: ${typingShake} 0.1s ease-in-out;
  }
`;

// 自製游標
const TypewriterCursor = styled.div`
  position: absolute;
  width: 2px;
  height: 20px;
  background: #333;
  animation: ${typewriterBlink} 1s infinite;
  z-index: 3;
  pointer-events: none;
`;

// 打字機按鍵區域
const KeyboardArea = styled.div`
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-top: 2px solid #444;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
`;

// 復古打字機按鍵
const TypewriterKey = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(145deg, #666, #444);
  border: 2px solid #777;
  color: #ddd;
  font-family: 'Typewriter', monospace;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  box-shadow: 
    0 3px 6px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.1);
  
  &:active {
    transform: translateY(2px);
    box-shadow: 
      0 1px 3px rgba(0,0,0,0.3),
      inset 0 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(145deg, #555, #333);
  }
  
  &:hover:not(:active) {
    background: linear-gradient(145deg, #777, #555);
    transform: translateY(-1px);
    box-shadow: 
      0 4px 8px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }
  
  /* 按鍵字母凹印效果 */
  &:before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%);
    pointer-events: none;
  }
`;

// 打字機狀態面板
const StatusPanel = styled.div`
  background: linear-gradient(145deg, #333, #222);
  border-top: 2px solid #555;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Typewriter', monospace;
  font-size: 9px;
  color: #aaa;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
  
  /* 復古指示燈 */
  &:before {
    content: '';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #0f0;
    border-radius: 50%;
    box-shadow: 0 0 6px #0f0;
  }
`;

const TypewriterTextEditor = () => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);
  const cursorRef = useRef(null);

  // 從 localStorage 載入資料
  useEffect(() => {
    const savedText = localStorage.getItem('typewriter-text-editor');
    if (savedText) {
      setText(savedText);
    } else {
      setText('歡迎使用復古打字機！\n\n請開始您的創作...\n\n每一個字都充滿了復古的韻味。');
    }
  }, []);

  // 自動儲存到 localStorage
  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        localStorage.setItem('typewriter-text-editor', text);
        setLastSaved(new Date().toLocaleTimeString());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [text]);

  // 更新統計資訊
  useEffect(() => {
    setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
    setCharCount(text.length);
  }, [text]);

  // 模擬打字音效（可選）
  const playTypewriterSound = () => {
    // 這裡可以添加打字音效
    // const audio = new Audio('/path/to/typewriter-sound.mp3');
    // audio.play().catch(() => {});
  };

  // 處理文字輸入
  const handleTextChange = (e) => {
    setText(e.target.value);
    setCursorPosition(e.target.selectionStart);
    setIsTyping(true);
    playTypewriterSound();
    
    // 打字動畫結束
    setTimeout(() => setIsTyping(false), 100);
  };

  // 清除文字
  const handleClear = () => {
    if (confirm('確定要清除所有文字嗎？')) {
      setText('');
      localStorage.removeItem('typewriter-text-editor');
    }
  };

  // 手動儲存
  const handleSave = () => {
    localStorage.setItem('typewriter-text-editor', text);
    setLastSaved(new Date().toLocaleTimeString());
  };

  // 快速插入文字
  const insertQuickText = (textToInsert) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    setText(newText);
    
    // 設置游標位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  return (
    <>
      <FontStyle />
      <TypewriterBody className={isTyping ? 'typing' : ''}>
        <PaperHolder>
          <TypewriterPaper>
            <TypingArea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              placeholder="開始在這台復古打字機上創作您的故事..."
              spellCheck={false}
            />
          </TypewriterPaper>
        </PaperHolder>
        
        <KeyboardArea>
          <TypewriterKey onClick={() => insertQuickText('...')} title="省略號">
            ...
          </TypewriterKey>
          <TypewriterKey onClick={() => insertQuickText('—')} title="破折號">
            —
          </TypewriterKey>
          <TypewriterKey onClick={() => insertQuickText('"')} title="引號">
            "
          </TypewriterKey>
          <TypewriterKey onClick={handleSave} title="手動儲存">
            💾
          </TypewriterKey>
          <TypewriterKey onClick={handleClear} title="清除文字">
            🗑
          </TypewriterKey>
        </KeyboardArea>
        
        <StatusPanel>
          <span>字數: {charCount} | 詞數: {wordCount}</span>
          <span>{lastSaved ? `已儲存 ${lastSaved}` : '自動儲存中...'}</span>
        </StatusPanel>
      </TypewriterBody>
    </>
  );
};

export default TypewriterTextEditor; 