# noraluk-portfolio

Personal portfolio site. Vite + React 19 (JSX, no TypeScript).

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — oxlint
- `npm run preview` — preview build

## Layout (each folder has its own CLAUDE.md — read it when you touch that folder)
- `src/components/` — reusable presentational UI, no business logic
- `src/sections/` — full page sections (Hero, About, Projects, Contact)
- `src/hooks/` — custom React hooks
- `src/lib/` — pure utils + constants, no React
- `src/styles/` — global CSS + tokens
- `src/assets/` — images, icons, fonts

## Conventions
- Components: one folder is overkill — one `.jsx` + colocated `.css` per component.
- Named exports for hooks/lib; default export for components.
- No state library until a real cross-page need appears (YAGNI).
- Import via relative paths; alias `@/` → `src/` (see vite.config.js) once it earns its keep.
