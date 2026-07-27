import React from 'react';

interface PixelLoadingProps {
  message?: string;
  progress?: number; // 0 to 100 optional
}

export const PixelLoading: React.FC<PixelLoadingProps> = ({ 
  message = "LOADING SYSTEM...", 
  progress 
}) => {
  return (
    <div style={{
      fontFamily: "'Press Start 2P', monospace",
      background: '#0F0E17',
      color: '#FFFFFE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      padding: '24px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      imageRendering: 'pixelated'
    }}>
      {/* CRT Scanline Overlay Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* Retro Loading Card Container */}
      <div style={{
        background: '#16161A',
        border: '4px solid #000000',
        padding: '40px 32px',
        boxShadow: '8px 8px 0px #000000, inset -3px -3px 0px #242629, inset 3px 3px 0px #383A3F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '480px',
        width: '90%',
        zIndex: 1
      }}>
        {/* Animated Pixel Spinner / Mascot */}
        <div style={{
          width: '48px',
          height: '48px',
          background: '#FF8E3C',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          color: '#0F0E17',
          animation: 'pixel-bounce 0.6s steps(2, start) infinite alternate'
        }}>
          ▲
        </div>

        {/* Message */}
        <div style={{
          fontSize: '0.85rem',
          color: '#FFFFFE',
          letterSpacing: '1px',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          {message}
        </div>

        {/* Pixel Progress Bar */}
        <div style={{
          width: '100%',
          height: '24px',
          background: '#0F0E17',
          border: '3px solid #000000',
          boxShadow: 'inset 2px 2px 0px #000000',
          padding: '3px',
          boxSizing: 'border-box'
        }}>
          {progress !== undefined ? (
            <div style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: '#2CB67D',
              transition: 'width 0.1s step-end'
            }} />
          ) : (
            <div style={{
              height: '100%',
              width: '35%',
              background: '#2CB67D',
              animation: 'pixel-bar-slide 1.2s steps(8, start) infinite'
            }} />
          )}
        </div>

        {/* Sub-status blinking text */}
        <div style={{
          fontFamily: "'VT323', 'DotGothic16', monospace",
          fontSize: '1.2rem',
          color: '#2CB67D',
          animation: 'pixel-blink 0.8s steps(2, start) infinite'
        }}>
          [PLEASE WAIT...]
        </div>
      </div>

      {/* Embedded Pixel Keyframe Animations */}
      <style>{`
        @keyframes pixel-bounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes pixel-bar-slide {
          0% { margin-left: 0%; width: 20%; }
          50% { margin-left: 50%; width: 35%; }
          100% { margin-left: 80%; width: 20%; }
        }
        @keyframes pixel-blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
