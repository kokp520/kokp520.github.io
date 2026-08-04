import React, { useEffect, useState, useRef } from "react";
import DropdownMenu from "./DropdownMenu";

const MENU_CONFIG = {
  icon: [
    { label: "關於這個 App", actionId: "about" },
    { label: "🏠 返回首頁 / Exit", actionId: "exit" },
    { type: "separator" },
    { label: "設定...", disabled: true },
    { label: "登出", disabled: true, action: () => alert("登出功能待開發！") },
  ],
  檔案: [
    { label: "New Finder Window", actionId: "browser" },
    { label: "New Terminal", actionId: "terminal" },
    { type: "separator" },
    { label: "Move to Trash", disabled: true },
    { label: "Empty Trash...", action: () => alert("垃圾桶已清空！") },
    { type: "separator" },
    { label: "Close", action: () => alert("關閉視窗功能待開發！") },
  ],
  編輯: [{ label: "Undo", disabled: true }, { label: "Redo", disabled: true }],
  檢視: [{ label: "Zoom In", disabled: true }, { label: "Zoom Out", disabled: true }],
  前往: [{ label: "Open Terminal", actionId: "terminal" }],
  幫助: [{ label: "顯示幫助訊息", action: () => alert("這是一個自訂的幫助訊息！") }],
};

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

const barStyle = {
  position: 'relative',
  width: '100%',
  height: 28,
  background: '#fff',
  borderBottom: '1.5px solid #222',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: "'Cubic_11', 'Press Start 2P', 'Pixel', 'monospace'",
  fontSize: 15,
  color: '#222',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  zIndex: 999
};

const leftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  marginLeft: 16
};

const appleStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginRight: 5,
  width: 20,
  height: 20
};

const rightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginRight: 18
};

const dateTimeStyle = {
  fontSize: 14
};

const exitBtnStyle = {
  background: '#f0f0f0',
  border: '1px solid #999',
  borderRadius: '4px',
  fontSize: '12px',
  padding: '2px 8px',
  cursor: 'pointer',
  fontFamily: 'inherit'
};

export default function MacMenuBar({ onOpenApp, onExit }) {
  const [now, setNow] = useState(() => new Date());
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuBarRef = useRef(null);
  const openAudioRef = useRef(null);
  const closeAudioRef = useRef(null);

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };
  
  const closeMenu = () => {
    if (openMenu) {
      playSound(closeAudioRef);
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);

    const handleOutsideClick = (event) => {
      if (menuBarRef.current && menuBarRef.current.contains(event.target)) {
        return;
      }
      if (event.target.closest(".dropdown-menu-container")) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenu]);

  const handleMenuClick = (menuName, event) => {
    if (openMenu === menuName) {
      closeMenu();
    } else {
      playSound(openAudioRef);
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({ x: rect.left, y: rect.bottom });
      setOpenMenu(menuName);
    }
  };

  const weekDay = WEEK_DAYS[now.getDay()];
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  // Attach dynamic callbacks to config items based on actionId
  const getMenuItems = (key) => {
    return MENU_CONFIG[key].map(item => {
      if (item.actionId === 'about') {
        return { ...item, action: () => onOpenApp?.('about') };
      }
      if (item.actionId === 'exit') {
        return { ...item, action: () => onExit?.() };
      }
      if (item.actionId === 'browser') {
        return { ...item, action: () => onOpenApp?.('browser') };
      }
      if (item.actionId === 'terminal') {
        return { ...item, action: () => onOpenApp?.('terminal') };
      }
      return item;
    });
  };

  return (
    <div style={barStyle} ref={menuBarRef}>
      <audio ref={openAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <audio ref={closeAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <div style={leftStyle}>
        {Object.keys(MENU_CONFIG).map(itemKey => {
          if (itemKey === 'icon') {
            return (
              <img
                key={itemKey}
                src="/assets/gpt_banana_icon.webp"
                alt="banana"
                style={{
                  ...appleStyle,
                  cursor: 'pointer',
                  padding: '2px',
                  borderRadius: 4,
                  backgroundColor: openMenu === itemKey ? '#e5e5e5' : 'transparent',
                }}
                onClick={(e) => handleMenuClick(itemKey, e)}
              />
            );
          }
          return (
            <span
              className="mac-menu-item"
              style={{
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 4,
                transition: 'background 0.2s',
                userSelect: 'none',
                backgroundColor: openMenu === itemKey ? '#e5e5e5' : 'transparent',
                display: typeof window !== 'undefined' && window.innerWidth <= 768 && itemKey !== '檔案' ? 'none' : 'inline-block'
              }}
              key={itemKey}
              onClick={(e) => handleMenuClick(itemKey, e)}
            >{itemKey}</span>
          );
        })}
      </div>
      {openMenu && (
        <DropdownMenu
          items={getMenuItems(openMenu)}
          position={menuPosition}
          onClose={closeMenu}
        />
      )}
      <div style={rightStyle}>
        <button
          onClick={() => onExit?.()}
          style={exitBtnStyle}
          title="返回首頁"
        >
          🏠 返回首頁
        </button>
        <span role="img" aria-label="volume">🔊</span>
        <span style={dateTimeStyle}>{`週${weekDay} ${now.getMonth() + 1}月${now.getDate()}日`}</span>
        <span style={dateTimeStyle}>{timeString}</span>
      </div>
    </div>
  );
} 