import React from 'react'
import { Icon } from './ui/Icon'

export const CommunityLinks: React.FC = () => {
  return (
    <div id="social">
      <Icon name="social-icon" />
      <h2>Connect with us</h2>
      <p>Join the Vite community</p>
      <ul>
        <li>
          <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
            <Icon name="github-icon" className="button-icon" />
            GitHub
          </a>
        </li>
        <li>
          <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
            <Icon name="discord-icon" className="button-icon" />
            Discord
          </a>
        </li>
        <li>
          <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
            <Icon name="x-icon" className="button-icon" />
            X.com
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
            <Icon name="bluesky-icon" className="button-icon" />
            Bluesky
          </a>
        </li>
      </ul>
    </div>
  )
}
