# noraluk-portfolio

This is **my personal portfolio** — a place to introduce myself and showcase my
work, built as an interactive terminal / HUD-style single page.

Instead of a typical scrolling site, it's a fake desktop terminal: pick a
command (About, Skills, Projects, Contact) by clicking a button or typing at the
prompt, and the output types out like a real shell. The Projects section is a
selectable browser — choose a project to open a readable detail card with an
image slot, highlights, tech tags, and links.

## Features

- 🖥️ Terminal / IDE window UI with mac-style window controls and a live status bar
- ⌨️ Type commands (`about`, `skills`, `projects`, `contact`, `help`, `clear`) or
  just click — plus `↑`/`↓` to recall previous commands
- 🗂️ Selectable project browser with image slots, ready to drop in screenshots
- ✨ Boot sequence, typewriter output, CRT scanlines
- ♿ Respects `prefers-reduced-motion`; keyboard and screen-reader friendly
- 📱 Fully responsive — works on mobile and desktop

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) (JSX, no TypeScript)
- Plain CSS with design tokens (pure-black OLED theme, JetBrains Mono)
- [Vitest](https://vitest.dev/) + Testing Library for tests, with an 80% coverage gate
- [oxlint](https://oxc.rs/) for linting

## Getting started

```bash
npm install
npm run dev      # start the dev server
```

Then open the printed local URL.

## Scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the dev server with HMR             |
| `npm run build`     | Production build                          |
| `npm run preview`   | Preview the production build              |
| `npm run lint`      | Lint with oxlint                          |
| `npm test`          | Run tests in watch mode                   |
| `npm run coverage`  | Run tests once with the 80% coverage gate |

## Project structure

```
src/
  components/   reusable presentational UI (Tag, ImageFrame)
  sections/     full sections (Terminal, ProjectBrowser)
  hooks/        custom hooks (useTypewriter)
  lib/          content + constants (edit projects here)
  styles/       global CSS + design tokens
  assets/       images, icons, fonts
```

## Editing content

All content lives in [`src/lib/constants.js`](src/lib/constants.js) — About,
Skills, Contact text and the `PROJECTS` list. To add a project, append an entry
to `PROJECTS`; to show a screenshot, drop the file in `src/assets/`, import it,
and set the project's `image` field (otherwise a placeholder is shown).
