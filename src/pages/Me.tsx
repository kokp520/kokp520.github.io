import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Me: React.FC = () => {
  return (
    <div style={{
      background: '#050505',
      color: '#e8e8e8',
      minHeight: '100vh',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      padding: '0 28px 80px',
      boxSizing: 'border-box'
    }}>
      <Helmet>
        <title>adi | Designer & Developer</title>
        <meta name="description" content="I’m adi — a designer, developer and maker. I build thoughtful, playful digital work across web, 3D, and typography." />
      </Helmet>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(5,5,5,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        margin: '0 -28px 40px',
        padding: '14px 28px'
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '15px' }}>
            adiolk<span style={{ opacity: 0.55 }}>98</span>
          </div>
          <nav style={{ display: 'flex', gap: '22px', fontSize: '13px', fontWeight: 500 }}>
            <a href="#work" style={{ color: '#888', textDecoration: 'none' }}>work</a>
            <a href="#articles" style={{ color: '#888', textDecoration: 'none' }}>articles</a>
            <a href="#journals" style={{ color: '#888', textDecoration: 'none' }}>journals</a>
            <a href="#contact" style={{ color: '#888', textDecoration: 'none' }}>contact</a>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <section style={{ padding: '40px 0' }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '0 0 18px',
            color: '#f0f0f0'
          }}>
            Designing small systems with <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#9a9a9a' }}>care & craft</em>.
          </h1>
          <p style={{ color: '#aaaaaa', fontSize: '15px', lineHeight: 1.65, maxWidth: '440px' }}>
            I’m adiolk98 — a designer, developer and maker.
            I build thoughtful, playful digital work across web, 3D, and typography.
          </p>
        </section>

        <section id="work" style={{ marginTop: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 12px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.14)',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            🧩 selected work
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '15px', color: '#f0f0f0' }}>Retro OS</h3>
              <p style={{ margin: 0, color: '#9a9a9a', fontSize: '13px', lineHeight: 1.55 }}>A personal website reimagined as a desktop: windows, apps, and mini-games.</p>
            </div>
            <div style={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '15px', color: '#f0f0f0' }}>CCD Cam</h3>
              <p style={{ margin: 0, color: '#9a9a9a', fontSize: '13px', lineHeight: 1.55 }}>Webcam meets Kodak DC50 — grain, glow, and analog imperfection.</p>
            </div>
          </div>
        </section>

        <section id="contact" style={{ marginTop: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 12px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.14)',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            📮 contact
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <a href="mailto:kokp520@gmail.com" target="_blank" rel="noreferrer" style={{
              background: '#0c0c0c',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{ fontSize: '11px', color: '#777', fontFamily: '"Space Mono", monospace' }}>email</div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '3px' }}>kokp520@gmail.com</div>
            </a>
            <a href="https://github.com/kokp520" target="_blank" rel="noreferrer" style={{
              background: '#0c0c0c',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{ fontSize: '11px', color: '#777', fontFamily: '"Space Mono", monospace' }}>github</div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '3px' }}>@kokp520</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
