---
name: add-project
description: >-
  Add a new featured project to the noraluk-portfolio terminal. Use when the
  user wants to add, insert, or showcase a new project in the portfolio's
  Projects section. Handles the PROJECTS entry, image wiring, and verification
  so the new card renders correctly in the ProjectBrowser.
---

# Add a project to the portfolio

Projects are content-driven: the terminal's Projects browser renders whatever is
in the `PROJECTS` array. Adding one = one array entry (+ an optional image).
Nothing in the components needs to change.

## Steps

1. **Gather the details** from the user. If any are missing, ask — don't invent
   real-looking links or claims:
   - `name` (short, lowercase, kebab-ish — shown as `~/name`)
   - `tagline` (one line, shown in the list)
   - `year`, `status` (e.g. `live`, `production`, `open-source`, `archived`)
   - `description` (2–4 short lines)
   - `highlights` (2–4 bullet-worthy achievements)
   - `tech` (array of labels, rendered as Tag chips)
   - `links.github`, `links.demo` (either may be `null`)
   - image (optional — see step 3)

2. **Add the entry** to the `PROJECTS` array in
   [src/lib/constants.js](../../../src/lib/constants.js). Match the existing
   object shape exactly. Multi-line strings use the `[...].join('\n')` pattern
   already used there. `id` must be unique (kebab-case). Order matters — the
   list renders top-to-bottom; put featured work first.

   ```js
   {
     id: 'unique-kebab-id',
     name: 'project-name',
     tagline: 'One-line hook shown in the list.',
     year: '2026',
     status: 'live',
     image: null, // or the imported asset — see step 3
     description: [
       'Line one.',
       'Line two.',
     ].join('\n'),
     highlights: [
       'A concrete outcome',
       'Another one',
     ],
     tech: ['React', 'Vite'],
     links: { github: 'https://github.com/...', demo: null },
   }
   ```

3. **Wire an image (optional).** The `image` field feeds
   `components/ImageFrame.jsx`. Leave it `null` to show the built-in
   "no preview yet" placeholder. To add a real image:
   - Drop the file in [src/assets/](../../../src/assets/) (per
     `src/assets` conventions — images live there).
   - At the top of `constants.js`, `import projImg from '../assets/your-file.png'`
     and set `image: projImg` on the entry. A remote URL string also works.
   - Prefer a 16:9 image (the frame uses that aspect ratio).

4. **Do NOT touch** `ProjectBrowser.jsx`, `Tag.jsx`, or `ImageFrame.jsx` — they
   render the data generically. If the user wants a new *field* displayed,
   that's a component change, not this skill.

5. **Verify** before finishing:
   - `npm run lint` (oxlint) passes.
   - `npm run build` passes.
   - Ideally `npm run dev`, open the terminal, run `projects`, confirm the new
     card appears in the list and its detail view renders (image or placeholder,
     highlights, tags, links).

## Notes
- Content only — no React changes needed for a standard project.
- Keep claims truthful; if the user hasn't given real links/metrics, use `null`
  or ask, rather than filling in plausible placeholders.
