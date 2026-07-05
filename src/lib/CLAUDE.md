# lib/

Pure JS: utils + constants (site content, project list, social links).

Rules:
- No React, no DOM — must be testable in isolation.
- Named exports. `constants.js` for static content, `utils.js` for helpers.
- Non-trivial helper → colocate a `*.test.js` (assert-based).
