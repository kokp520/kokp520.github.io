# adiolk98.github.io

Personal website, portfolio, and utility toolbox built with **React**, **TypeScript**, **Vite**, and **React Router**. Automatically built and deployed via **GitHub Actions** to GitHub Pages.

---

## 🚀 Architectural Overview

* **Framework**: React 19 + TypeScript + Vite
* **Routing**: React Router (`react-router-dom`)
  * `/` — Home / Showcase
  * `/tools` — Toolbox portal
  * `/tools/gifToZip` — Pure client-side GIF to PNG sequence converter & ZIP packager
  * `/me` — Personal blog & portfolio
* **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) triggered on `main` branch pushes.
* **Static Assets**: Managed in `public/` (e.g., `favicon.svg`, `icons.svg`).

---

## 🛠️ Local Development & Scripts

### Prerequisites
* Node.js >= 18
* npm >= 9

### Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start local Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Perform TypeScript type-checking (`tsc -b`) and produce production bundle (`dist/`) |
| `npm run preview` | Locally preview the production build in `dist/` |

---

## 📦 Project Structure

```text
adiolk98.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Pages CI/CD workflow
├── public/                 # Raw static assets (favicon, icons, etc.)
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Page views (Tools, GifToZip, Me)
│   ├── App.tsx             # React Router entry point & route definitions
│   ├── main.tsx            # React DOM mounting
│   └── index.css           # Design tokens and global CSS
├── package.json
├── tsconfig.json
└── vite.config.ts          # Vite configuration
```
