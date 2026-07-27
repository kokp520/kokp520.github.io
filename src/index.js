import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// 全域錯誤處理器
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes('play')) {
    // 靜默處理音頻播放錯誤
    console.warn('Global audio error handled:', event.error.message);
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('play')) {
    // 靜默處理音頻播放 Promise 拒絕
    console.warn('Global audio promise rejection handled:', event.reason.message);
    event.preventDefault();
  }
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);