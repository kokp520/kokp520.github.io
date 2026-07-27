import React, { useState, useEffect } from 'react';

// 登入畫面 - 仿Yahoo即時通風格
function YahooLoginScreen({ onLogin }) {
  const [inputName, setInputName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [showInvisibleDialog, setShowInvisibleDialog] = useState(false);

  // 組件載入時檢查是否有保存的nickname
  useEffect(() => {
    const savedNickname = localStorage.getItem('yahoo-messenger-nickname');
    if (savedNickname) {
      setInputName(savedNickname);
    }
  }, []);

  const handleLogin = () => {
    if (inputName.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(inputName.trim());
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleInvisibleChange = (e) => {
    if (e.target.checked) {
      // 先讓勾選出現，然後貓咪手會把它打掉
      setIsInvisible(true);
      setShowInvisibleDialog(true);
      
      // 1秒後貓咪手打掉勾選
      setTimeout(() => {
        setIsInvisible(false);
      }, 1000);
      
      setTimeout(() => {
        setShowInvisibleDialog(false);
      }, 4000);
    }
  };

  return (
    <div className="yahoo-login">
      <div className="login-container">
        <div className="yahoo-logo">
          <div className="yahoo-icon">
            <img 
              src="/assets/app/yahoo-message-removebg-preview.png" 
              alt="Yahoo 即時通"
              className="yahoo-login-icon"
            />
          </div>
          <h2>Yahoo! 即時通</h2>
        </div>
        
        <div className="login-form">
          <div className="form-group">
            <label>登入帳號(I)：</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="請輸入您的ID"
              className="yahoo-input"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label>登入密碼：</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="••••••••"
              className="yahoo-input"
            />
          </div>

          <a href="#" className="link">申請新的Yahoo!奇摩帳號</a>
          
          <div className="login-options">
            <label className="checkbox-label disabled">
              <input type="checkbox" checked disabled />
              自動記住帳號及密碼(R)
            </label>
            <label className="checkbox-label disabled">
              <input type="checkbox" checked disabled />
              開機後自動登入(A)
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={isInvisible}
                onChange={handleInvisibleChange}
              />
              以隱藏模式登入(V)
              {showInvisibleDialog && (
                <div className="cat-paw">🐾</div>
              )}
            </label>
          </div>
          
          <button 
            onClick={handleLogin}
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={!inputName.trim() || isLoading}
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
        </div>
        
        <div className="login-footer">
          <a href="#" className="link">忘記登入密碼？</a>
        </div>
      </div>

      {/* 隱形登入對話框 */}
      {showInvisibleDialog && (
        <div className="invisible-dialog">
          <div className="dialog-bubble">
            <p>目前沒什麼用</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default YahooLoginScreen;