import React, { useState, useEffect, useRef } from 'react';

// Yahoo即時通經典功能
const INSTANT_FEATURES = {
  '/buzz': '嗡嗡嗡！',
  '/nudge': '敲敲',
  '/wink': '眨眨眼 😉',
  '/kiss': '給你一個吻 💋',
  '/hug': '給你一個抱抱 🤗'
};

// 聊天視窗組件 - 作為彈出視窗
function YahooChatWindow({ room, username, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef(null);
  const fetchIntervalRef = useRef(null);
  const windowRef = useRef(null);

  // 連接狀態管理
  useEffect(() => {
    setIsConnected(true);
    fetchMessages();
    
    // 每2秒刷新一次訊息
    fetchIntervalRef.current = setInterval(fetchMessages, 2000);
    
    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current);
      }
    };
  }, [room.id]);

  // 從server獲取訊息
  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/messages?groupId=${room.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('獲取訊息失敗:', error);
      setIsConnected(false);
    }
  };

  // 發送訊息到server
  const sendMessage = async (text) => {
    try {
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          text: text,
          groupId: room.id,
          timestamp: new Date().toISOString() // 添加完整時間戳記
        }),
      });
      // 發送後立即刷新訊息
      setTimeout(fetchMessages, 100);
    } catch (error) {
      console.error('發送訊息失敗:', error);
      setIsConnected(false);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const command = INSTANT_FEATURES[inputText.trim()];
      if (command) {
        sendMessage(command);
      } else {
        sendMessage(inputText.trim());
      }
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-TW', { 
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 工具列功能 - 叮咚 + 搖晃視窗
  const handleDingDongShake = () => {
    // 發送叮咚訊息
    sendMessage('🔔 叮咚！有人在家嗎？');
    // 同時搖晃視窗
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };

  return (
    <div className={`yahoo-chat-popup ${isShaking ? 'shake' : ''}`} ref={windowRef}>
      {/* 聊天視窗標題列 */}
      <div className="chat-popup-titlebar">
        <span className="titlebar-text">
          {room.icon} {room.name} - Yahoo! 即時通
        </span>
        <div className="titlebar-buttons">
          <button className="titlebar-btn minimize">_</button>
          <button className="titlebar-btn close" onClick={onClose}>×</button>
        </div>
      </div>

      {/* 聊天訊息區 */}
      <div className="chat-popup-messages">
        <div className="messages-header">
          <span>{room.description}</span>
          <button onClick={fetchMessages} className="refresh-btn">🔄</button>
        </div>
        
        <div className="messages-content">
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>目前沒有訊息</p>
              <p>開始您的第一個對話吧！</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <span className={`message-user ${msg.user === username ? 'own-user' : ''}`}>
                    {msg.user}
                  </span>
                  <span className="message-time">
                    {formatTime(msg.timestamp || msg.createdAt || Date.now())}
                  </span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 工具列 */}
      <div className="chat-popup-toolbar">
        <div className="toolbar-left">
          <button className="chat-btn">A</button>
          <button className="chat-btn" onClick={handleDingDongShake} title="叮咚！有人在家嗎？(搖晃視窗)">
            🔔
          </button>
          <button className="chat-btn">🎨</button>
          <button className="chat-btn">😊</button>
        </div>
        <div className="toolbar-right">
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 已連線' : '🔴 未連線'}
          </span>
        </div>
      </div>

      {/* 輸入區域 */}
      <div className="chat-popup-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={room.id === 'message-board' 
              ? '在留言板留下您的足跡... ' 
              : '輸入訊息... '
            }
            className="message-input"
            rows="3"
          />
          <button 
            onClick={handleSend}
            className="send-btn"
            disabled={!inputText.trim()}
          >
            傳送
          </button>
        </div>
      </div>

      {/* 狀態列 */}
      <div className="chat-popup-statusbar">
        <span>{room.icon}</span>
        <span>訊息數: {messages.length}</span>
      </div>
    </div>
  );
}

export default YahooChatWindow;