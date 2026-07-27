import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'

const RetroPC = lazy(() => import('./pages/RetroPC'))
const ToolsIndex = lazy(() => import('./pages/Tools/Index').then(m => ({ default: m.ToolsIndex })))
const GifToZip = lazy(() => import('./pages/Tools/GifToZip').then(m => ({ default: m.GifToZip })))
const JsonFormatter = lazy(() => import('./pages/Tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })))
const Me = lazy(() => import('./pages/Me').then(m => ({ default: m.Me })))

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div style={{ background: '#000', color: '#00ff00', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>Loading system...</div>}>
        <Routes>
          <Route path="/" element={<RetroPC />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/gifToZip" element={<GifToZip />} />
          <Route path="/tools/jsonFormatter" element={<JsonFormatter />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
