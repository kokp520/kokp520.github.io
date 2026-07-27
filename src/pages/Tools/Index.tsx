import React from 'react';
import { Link } from 'react-router-dom';

export const ToolsIndex: React.FC = () => {
  return (
    <div style={{
      fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
      background: '#0b0f19',
      backgroundImage: `
        radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)
      `,
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '12px',
          background: 'linear-gradient(135deg, #e879f9, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Adi's Toolbox
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 300 }}>
          日常實用小工具集合
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '900px'
      }}>
        {/* GIF to ZIP Tool */}
        <Link 
          to="/tools/gifToZip" 
          style={{
            background: 'rgba(22, 27, 43, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '28px',
            textDecoration: 'none',
            color: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{
            fontSize: '2.5rem',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            🎬
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '8px', color: '#e2e8f0' }}>
              GIF to ZIP
            </div>
            <div style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.5 }}>
              將 GIF 動畫轉換為高品質的 PNG 序列，並打包成 ZIP 下載。純前端處理，確保隱私安全。
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
