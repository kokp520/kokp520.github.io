# Project Context and Conventions

## Core Architectural Principles

1. **Tech Stack**: React 19 + TypeScript + Vite + React Router (`react-router-dom`).
2. **Single-Page Application Routing**: All routes (`/`, `/tools`, `/tools/gifToZip`, `/me`) must be defined as React page components under `src/pages/` and registered in `src/App.tsx`.
3. **Pure Client-Side Operations**: Tools like GIF processing must run entirely in the browser using client-side Web APIs and WebAssembly/JS libraries (`jszip`, `omggif`).

## Naming Conventions & Code Style

* **Files and Directories**:
  * React Component files: `PascalCase.tsx` (e.g., `src/pages/Tools/GifToZip.tsx`, `src/pages/Me.tsx`).
  * Non-component utilities & assets: `camelCase.ts` or `camelCase.svg`.
* **TypeScript Discipline**:
  * Explicitly type all state, props, and async event handlers.
  * No `any` types unless interfacing with un-typed external JS libraries.
* **Styling**:
  * Modern CSS tokens, dark mode palette (`#0b0f19`, `#050505`), glassmorphism, Google Fonts (`Outfit`, `Space Mono`, `DM Sans`).

## Deployment Contract

* **Branch Strategy**: Development occurs on feature branches or `main`.
* **Automated Publishing**: Never manually compile or copy `dist/` into the source tree. GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to the `gh-pages` branch upon pushing to `main`.
