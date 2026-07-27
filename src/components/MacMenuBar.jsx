import React, { useEffect, useState, useRef } from "react";
import DropdownMenu from "./DropdownMenu";

export default function MacMenuBar({ onOpenApp }) {
  const [now, setNow] = useState(new Date());
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

  const showHelp = () => {
    alert("這是一個自訂的幫助訊息！");
  };

  const menuConfig = {
    icon: [
        { label: "關於這個 App", action: () => onOpenApp('about') },
        { type: "separator" },
        { label: "設定...", disabled: true },
        { label: "登出", disabled: true, action: () => alert("登出功能待開發！") },
    ],
    檔案: [
      { label: "New Finder Window", action: () => onOpenApp('browser') },
      { label: "New Terminal", action: () => onOpenApp('terminal') },
      { type: "separator" },
      { label: "Move to Trash", disabled: true },
      { label: "Empty Trash...", action: () => alert("垃圾桶已清空！") },
      { type: "separator" },
      { label: "Close", action: () => alert("關閉視窗功能待開發！") },
    ],
    編輯: [{ label: "Undo", disabled: true }, { label: "Redo", disabled: true }],
    檢視: [{ label: "Zoom In", disabled: true }, { label: "Zoom Out", disabled: true }],
    前往: [{ label: "Open Terminal", action: () => onOpenApp('terminal') }],
    幫助: [{ label: "顯示幫助訊息", action: showHelp }],
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

  const weekDay = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

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
  const menuItemStyle = (menuName) => ({
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: 4,
    transition: 'background 0.2s',
    userSelect: 'none',
    backgroundColor: openMenu === menuName ? '#e5e5e5' : 'transparent'
  });
  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginRight: 18
  };
  const dateTimeStyle = {
    fontSize: 14
  };

  return (
    <div style={barStyle} ref={menuBarRef}>
      <audio ref={openAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <audio ref={closeAudioRef} src="/assets/sound-effects/select.wav" preload="auto" />
      <div style={leftStyle}>
        {Object.keys(menuConfig).map(itemKey => {
          if (itemKey === 'icon') {
            return (
              <img
                key={itemKey}
                src="/assets/gpt_banana_icon.png"
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
              style={menuItemStyle(itemKey)}
              key={itemKey}
              onClick={(e) => handleMenuClick(itemKey, e)}
            >{itemKey}</span>
          );
        })}
      </div>
      {openMenu && (
        <DropdownMenu
          items={menuConfig[openMenu]}
          position={menuPosition}
          onClose={closeMenu}
        />
      )}
      <div style={rightStyle}>
        <span role="img" aria-label="volume">🔊</span>
        <span style={dateTimeStyle}>{`週${weekDay} ${now.getMonth() + 1}月${now.getDate()}日`}</span>
        <span style={dateTimeStyle}>{timeString}</span>
      </div>
    </div>
  );
} 