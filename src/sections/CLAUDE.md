# sections/

Full page sections composed into the page (Hero, About, Projects, Contact).

Rules:
- A section owns its layout + section-specific state; composes `components/`.
- One folder per section only if it has helpers; otherwise a single `Hero.jsx`.
- Content/data lives in `lib/` constants, not hardcoded deep in JSX.
