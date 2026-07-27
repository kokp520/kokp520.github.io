import React from 'react';

const APP_STORE_URL = 'https://apps.apple.com/tw/app/你的app名稱/id1234567890'; // 請換成你的 app id
const APP_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg'; // App Store 圖標

export default function OpenAppStore() {
  const handleOpen = () => {
    window.location.href = APP_STORE_URL;
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#f8f8f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 24, left: 0, width: '100%', textAlign: 'center', color: '#222', fontWeight: 'bold', fontSize: 18 }}>
        iPhone 6s
      </div>
      <div style={{ marginTop: 80, marginBottom: 24 }}>
        <img
          src={APP_ICON_URL}
          alt="App Store"
          style={{ width: 100, height: 100, borderRadius: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer' }}
          onClick={handleOpen}
        />
        <div style={{ marginTop: 12, fontSize: 18, color: '#222' }}>App Store</div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, width: '100%', textAlign: 'center', color: '#aaa', fontSize: 14 }}>
        點擊圖標前往 App Store 下載頁面
      </div>
    </div>
  );
} 