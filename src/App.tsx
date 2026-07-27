import { HashRouter, Routes, Route } from 'react-router-dom'
import { ToolsIndex } from './pages/Tools/Index'
import { GifToZip } from './pages/Tools/GifToZip'
import { Me } from './pages/Me'
import './App.css'


import RetroPC from './pages/RetroPC'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RetroPC />} />
        <Route path="/tools" element={<ToolsIndex />} />
        <Route path="/tools/gifToZip" element={<GifToZip />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </HashRouter>
  )
}

export default App
