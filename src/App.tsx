import { useState } from 'react'
import { HeroShowcase } from './components/HeroShowcase'
import { DocNavigation } from './components/DocNavigation'
import { CommunityLinks } from './components/CommunityLinks'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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

export default App
