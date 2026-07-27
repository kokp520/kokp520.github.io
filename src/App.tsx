import { useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { HeroShowcase } from './components/HeroShowcase'
import { DocNavigation } from './components/DocNavigation'
import { CommunityLinks } from './components/CommunityLinks'
import { ToolsIndex } from './pages/Tools/Index'
import { GifToZip } from './pages/Tools/GifToZip'
import { Me } from './pages/Me'
import './App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <Link to="/tools" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>Toolbox (/tools)</Link>
        <Link to="/me" style={{ color: '#ec4899', textDecoration: 'none', fontWeight: 600 }}>Blog (/me)</Link>
      </nav>

      <HeroShowcase
        count={count}
        onIncrement={() => setCount((prev) => prev + 1)}
      />

      <div className="ticks"></div>

      <section id="next-steps">
        <DocNavigation />
        <CommunityLinks />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ToolsIndex />} />
        <Route path="/tools/gifToZip" element={<GifToZip />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </HashRouter>
  )
}

export default App
