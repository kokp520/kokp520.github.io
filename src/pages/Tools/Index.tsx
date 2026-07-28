import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollWorldComponent } from '../../components/ScrollWorld/ScrollWorldComponent';

export const ToolsIndex: React.FC = () => {
  return (
    <div style={{ background: '#0F0E17', minHeight: '100vh', width: '100%' }}>
      <Helmet>
        <title>adi's Toolbox | Developer Utilities</title>
        <meta name="description" content="A collection of web-based developer tools and utilities built by adi, including GIF to ZIP converters, JSON formatters, and YAML tools." />
      </Helmet>
      
      {/* CRT Scanline Overlay Effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 99
      }} />

      {/* Scroll World Component */}
      <ScrollWorldComponent />
    </div>
  );
};
