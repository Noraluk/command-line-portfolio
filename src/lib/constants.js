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
    'Noraluk Chotibuth — Full Stack Developer  ·  Suphan Buri, Thailand',
    '',
    'Backend-focused engineer with 5+ years building scalable APIs and',
    'financial systems across the fintech and logistics sectors. Golang is',
    'my core; I also deliver full-stack and mobile with NestJS, React, and',
    'Flutter.',
    '',
    'Now at OPN, developing backend services for a global payment platform —',
    'high-performance APIs, GraphQL, and secure transaction processing for',
    'merchants worldwide.',
    '',
    'Education',
    '  M.S. Data Science   — Macquarie University, Sydney       (2024–2026)',
    '  B.Eng Computer Eng. — Thai-Nichi Institute of Technology (2015–2019)',
    '',
    'I care about performance under load, data integrity, and systems that',
    'stay up when traffic spikes.',
    '',
    'Lately I am seriously into AI-assisted development — using tools like',
    'Claude and Codex to build, review, and ship faster, and working out how',
    'to weave them into real engineering workflows.',
  ].join('\n'),

  skills: [
    'Languages    : Go, TypeScript, JavaScript, Python, SQL',
    'Backend      : NestJS, Node.js, GraphQL, GORM, REST',
    'Frontend     : React, Next.js',
    'Mobile       : Flutter (Android / iOS)',
    'Databases    : PostgreSQL, MySQL, MongoDB, Redis',
    'Tools        : Git, Docker',
    'AI-assisted  : Claude, Codex',
  ].join('\n'),

  contact: [
    'email    : noraluk.kn@gmail.com',
    'github   : github.com/Noraluk',
    'linkedin : www.linkedin.com/in/noraluk-chotibuth',
    'location : Suphan Buri, Thailand',
    '',
    'Best way to reach me is email — I usually reply within a day.',
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
    id: 'command-line-portfolio',
    name: 'command-line-portfolio',
    tagline: 'This site — an interactive terminal-style portfolio.',
    year: '2026',
    status: 'live',
    image: null,
    description: [
      'A keyboard-and-click driven terminal that doubles as a portfolio.',
      'Boot sequence, typewriter output, and a selectable project browser —',
      'built in React + Vite and deployed on Cloudflare Workers.',
    ].join('\n'),
    highlights: [
      'Responsive and accessible (respects prefers-reduced-motion)',
      'Tested with Vitest at 80%+ coverage',
      'CI/CD to Cloudflare Workers via GitHub Actions',
    ],
    tech: ['React', 'Vite', 'Cloudflare Workers'],
    links: {
      github: 'https://github.com/Noraluk/command-line-portfolio',
      demo: 'https://command-line-portfolio.noraluk-kn.workers.dev',
    },
  },
  {
    id: 'dofarm',
    name: 'Dofarm',
    tagline: 'Aquaculture management app for shrimp & fish farms.',
    year: null,
    status: 'Google Play',
    image: null,
    description: [
      'A cross-platform mobile app that helps shrimp and fish farmers manage',
      'and monitor their operations. Built with Flutter and published on the',
      'Google Play Store.',
    ].join('\n'),
    highlights: [
      'Cross-platform (Android / iOS) with Flutter',
      'Published on Google Play',
      'End-to-end farm management workflows',
    ],
    tech: ['Flutter', 'Dart'],
    links: {
      github: null,
      demo: 'https://play.google.com/store/apps/details?id=com.triofarm.do_farm',
    },
  },
  {
    id: 'financial-backend',
    name: 'financial-backend',
    tagline: 'Secure financial back-office infrastructure.',
    year: null,
    status: 'company project',
    image: null,
    description: [
      'A secure back-office system for financial operations, built with',
      'NestJS — API design, data integrity, and admin tooling.',
    ].join('\n'),
    highlights: [
      'Built with NestJS + TypeScript',
      'Secure back-office workflows',
      'Company project',
    ],
    tech: ['NestJS', 'TypeScript'],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    id: 'hr-management',
    name: 'hr-management',
    tagline: 'Internal HR tool that automates admin tasks.',
    year: null,
    status: 'company project',
    image: null,
    description: [
      'A customized internal HR management system that automates repetitive',
      'administrative tasks, built in Python.',
    ].join('\n'),
    highlights: [
      'Automates HR admin workflows',
      'Custom-built for internal use',
      'Written in Python',
    ],
    tech: ['Python'],
    links: {
      github: null,
      demo: null,
    },
  },
]
