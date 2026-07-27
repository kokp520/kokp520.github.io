import React from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { Icon } from './ui/Icon'

export const DocNavigation: React.FC = () => {
  return (
    <div id="docs">
      <Icon name="documentation-icon" />
      <h2>Documentation</h2>
      <p>Your questions, answered</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank" rel="noreferrer">
            <img className="logo" src={viteLogo} alt="" />
            Explore Vite
          </a>
        </li>
        <li>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            <img className="button-icon" src={reactLogo} alt="" />
            Learn more
          </a>
        </li>
      </ul>
    </div>
  )
}
