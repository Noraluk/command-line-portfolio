# components/

Reusable presentational UI (Button, Card, Icon, Tag...). Used across sections.

Rules:
- Presentational only — no data fetching, no page-specific logic.
- Props in, JSX out. Keep them dumb and generic.
- One `Name.jsx` + optional `Name.css` per component. Default export.
- If a component is used by only one section, it belongs in `sections/`, not here.
