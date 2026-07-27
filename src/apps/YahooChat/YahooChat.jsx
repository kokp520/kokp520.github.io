import React, { useState, useEffect } from 'react';
import YahooLoginScreen from './YahooLoginScreen';
import YahooMainWindow from './YahooMainWindow';
import YahooChatWindow from './YahooChatWindow';
import './YahooChat.css';

// 主要即時通組件
function YahooChat() {
  const [username, setUsername] = useState('');
  const [openChatWindows, setOpenChatWindows] = useState({}); // 管理多個聊天視窗

  // 組件載入時檢查是否有保存的nickname
  useEffect(() => {
    const savedNickname = localStorage.getItem('yahoo-messenger-nickname');
    if (savedNickname) {
      setUsername(savedNickname);
    }
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    // 將nickname保存到localStorage
    localStorage.setItem('yahoo-messenger-nickname', name);
  };

  const handleLogout = () => {
    setUsername('');
    setOpenChatWindows({}); // 關閉所有聊天視窗
    // 清除保存的nickname
    localStorage.removeItem('yahoo-messenger-nickname');
  };

  const handleOpenChat = (room) => {
    setOpenChatWindows(prev => ({
      ...prev,
      [room.id]: room
    }));
  };

  const handleCloseChat = (roomId) => {
    setOpenChatWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[roomId];
      return newWindows;
    });
  };

  // 如果未登入，顯示登入畫面
  if (!username) {
    return <YahooLoginScreen onLogin={handleLogin} />;
  }

  // 登入後顯示主界面
  return (
    <div className="instant-chat-container">
      {/* 主界面 */}
      <YahooMainWindow 
        username={username}
        onLogout={handleLogout}
        onOpenChat={handleOpenChat}
      />

      {/* 彈出的聊天視窗 */}
      {Object.entries(openChatWindows).map(([roomId, room]) => (
        <div key={roomId} className="chat-popup-overlay">
          <YahooChatWindow
            room={room}
            username={username}
            onClose={() => handleCloseChat(roomId)}
          />
        </div>
      ))}
    </div>
  );
}

export default YahooChat;