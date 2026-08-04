import React, { useState, useRef, useEffect } from "react";

function createTab(url = "https://adiolk98.github.io/#/tools") {
  return {
    id: Date.now() + Math.random(),
    url,
    title: url,
    input: url,
    error: "",
  };
}

export default function BrowserApp({ playClick }) {
  const [tabs, setTabs] = useState([createTab()]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const inputRefs = useRef({});

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  const handleInputChange = (e, id) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === id ? { ...tab, input: e.target.value } : tab
      )
    );
  };

  // 新網址輸入
  // 整理 url 
  const handleInputKeyDown = (e, id) => {
    if (e.key === "Enter") {
      let input = e.target.value.trim();
      let targetUrl = input; // This is the URL we want to view

      // 判斷是否為網址
      const isLikelyUrl =
        /^https?:\/\//i.test(input) ||
        /\.[a-z]{2,}(\/|$)/i.test(input);
      
      if (!isLikelyUrl) {
        // 關鍵字搜尋，使用 Google
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
      } else if (!/^https?:\/\//i.test(input)) {
        targetUrl = "https://" + input;
      }
      
      // The iframe's src should point to our proxy, with the target URL as a query param.
      // The new proxy middleware will handle the rest.
      // const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;

      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === id ? { ...tab, url: targetUrl, input: targetUrl, error: "" } : tab
        )
      );
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 800,
      height: 500,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 12,
      boxShadow: '0 2px 16px #0001',
      overflow: 'hidden',
    }}>
      {/* Address Bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <input
          ref={el => inputRefs.current[activeTab.id] = el}
          type="text"
          value={activeTab.input}
          onChange={e => handleInputChange(e, activeTab.id)}
          onKeyDown={e => handleInputKeyDown(e, activeTab.id)}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #bbb',
            fontSize: 12,
            outline: 'none',
            overflow: 'auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          placeholder="輸入網址..."
        />
      </div>
      {/* Browser Content , iframe to div*/}
      {activeTab.error && (
        <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center', color: 'red', zIndex: 2 }}>
          {activeTab.error}
        </div>
      )}
      <iframe
        id={`browser-iframe-${activeTab.id}`}
        src={activeTab.url}
        title="browser"
        style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
      />    
    </div>
  );
}