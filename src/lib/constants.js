// Static portfolio content rendered inside the terminal.

export const USER = 'visitor'
export const HOST = 'noraluk'

// Menu items: key shown as [n], label on the button, cmd echoed in the prompt.
export const MENU = [
  { key: '1', id: 'about', label: 'About Me', cmd: 'about' },
  { key: '2', id: 'skills', label: 'Core Skills', cmd: 'skills' },
  { key: '3', id: 'projects', label: 'Featured Projects', cmd: 'projects --list' },
  { key: '4', id: 'contact', label: 'Contact', cmd: 'contact' },
]

// Lines typed out on first load, before the menu appears (skippable).
export const BOOT_LINES = [
  'booting noraluk-os v2.0 ...',
  'loading modules [about] [skills] [projects] [contact] ... ok',
  'establishing secure session ... ok',
  'ready.',
]

// Output body per command id. Plain strings — the terminal renders with pre-wrap.
// `projects` is intentionally absent: it renders the interactive ProjectBrowser.
export const OUTPUT = {
  welcome: [
    "Welcome to noraluk's terminal portfolio.",
    "Type a command at the prompt (try 'help'), or just click a button below.",
  ].join('\n'),

  about: [
    'Noraluk C. — Software Engineer @ Opn',
    '',
    'I build reliable web products end to end: clean React front ends,',
    'pragmatic APIs, and the boring infrastructure that keeps them up.',
    'I like small diffs, fast feedback loops, and code that reads',
    'like the person after me matters.',
  ].join('\n'),

  skills: [
    'Languages   : JavaScript, TypeScript, Go, SQL',
    'Frontend    : React, Vite, CSS, accessibility',
    'Backend     : Node.js, REST, PostgreSQL',
    'Tooling     : Git, Docker, CI/CD, Linux',
  ].join('\n'),

  contact: [
    'email    : noraluk.c@opn.ooo',
    'github   : github.com/noraluk',
    'linkedin : linkedin.com/in/noraluk',
    '',
    'Best way to reach me is email — I reply within a day.',
  ].join('\n'),

  help: [
    'Available commands:',
    '  [1] about      — who I am',
    '  [2] skills     — the stack I work in',
    '  [3] projects   — browse featured work (selectable)',
    '  [4] contact    — how to reach me',
    '',
    'Shortcuts: press 1-4 to run a command · c to clear · ? for this help',
  ].join('\n'),
}

// Featured projects. `image` is an imported asset or a URL; leave it null to
// render the "ready for an image" placeholder in ImageFrame — drop a file in
// src/assets, import it here, and it shows up. Nothing else to wire.
export const PROJECTS = [
  {
    id: 'terminal-portfolio',
    name: 'terminal-portfolio',
    tagline: 'This very site — an interactive terminal UI.',
    year: '2026',
    status: 'live',
    image: null,
    description: [
      'A keyboard-and-click driven terminal that doubles as a portfolio.',
      'Boot sequence, typewriter output, and a selectable project browser —',
      'all in React + Vite with zero runtime dependencies.',
    ].join('\n'),
    highlights: [
      'Fully responsive, works on mobile and desktop',
      'Respects prefers-reduced-motion for accessibility',
      'Content-driven: add a project by editing one array',
    ],
    tech: ['React', 'Vite', 'CSS'],
    links: {
      github: 'https://github.com/noraluk/terminal-portfolio',
      demo: null,
    },
  },
  {
    id: 'pay-widget',
    name: 'pay-widget',
    tagline: 'Embeddable checkout — under 10kb, accessibility-first.',
    year: '2025',
    status: 'production',
    image: null,
    description: [
      'A drop-in payment widget that host merchants embed with one script tag.',
      'Focus-trapped, screen-reader friendly, and themeable to match any brand.',
    ].join('\n'),
    highlights: [
      'Ships under 10kb gzipped',
      'WCAG 2.1 AA compliant checkout flow',
      'Processes live traffic across multiple merchants',
    ],
    tech: ['TypeScript', 'Web Components', 'Rollup'],
    links: {
      github: 'https://github.com/noraluk/pay-widget',
      demo: 'https://example.com/pay-widget',
    },
  },
  {
    id: 'logpipe',
    name: 'logpipe',
    tagline: 'Streaming log tailer with fuzzy filters.',
    year: '2024',
    status: 'open-source',
    image: null,
    description: [
      'A terminal tool that tails multiple log streams at once and lets you',
      'fuzzy-filter them live, with color-coded sources and regex highlights.',
    ].join('\n'),
    highlights: [
      'Handles thousands of lines/sec without dropping frames',
      'Fuzzy + regex filtering with instant feedback',
      'Single static binary, no runtime deps',
    ],
    tech: ['Go', 'CLI', 'Concurrency'],
    links: {
      github: 'https://github.com/noraluk/logpipe',
      demo: null,
    },
  },
]
