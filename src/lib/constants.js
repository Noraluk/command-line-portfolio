import novelHubPreview from '../assets/novel-hub-add-novel.png'
import novelHubWelcomeOne from '../assets/01_welcome.png'
import novelHubWelcomeTwo from '../assets/02_welcome.png'
import novelHubWelcomeThree from '../assets/03_welcome.png'
import novelHubSocialLogin from '../assets/04_social_login.png'
import novelHubHome from '../assets/05_home.png'
import novelHubNewChapters from '../assets/06_new_chapters.png'
import novelHubLibrary from '../assets/07_library.png'
import novelHubBrowse from '../assets/08_browse.png'
import novelHubFilters from '../assets/09_browse_filter.png'
import novelHubDetail from '../assets/10_novel_detail.png'
import novelHubReader from '../assets/11_novel_content.png'
import novelHubDarkReader from '../assets/12_novel_content_dark.png'
import novelHubEpisodeReader from '../assets/13_novel_episode_in_content.png'
import novelHubTranslation from '../assets/14_novel_content_translate.png'
import novelHubReaderSettings from '../assets/15_novel_content_detail.png'
import novelHubEpisodes from '../assets/16_novel_episode_list.png'
import novelHubProfile from '../assets/18_profile.png'

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
    'IELTS — Overall 5.5',
    '  Listening 6.0  ·  Reading 5.5  ·  Writing 5.0  ·  Speaking 6.0',
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
    id: 'novel-hub',
    name: 'Novel Hub',
    tagline: 'Translate Japanese web novels to Thai in three taps — at zero running cost.',
    year: '2026',
    status: 'personal project',
    role: 'Built end-to-end — Flutter app · Golang API · MongoDB model · nightly update job',
    image: novelHubPreview,
    imageAspect: 'portrait',
    description: [
      'A personal mobile reader that makes Japanese web novels from Kakuyomu',
      'easy to translate on a phone. Paste a URL, open a chapter, and read it',
      'in Thai in three taps — without moving text between multiple apps.',
    ].join('\n'),
    detailSections: [
      {
        title: 'Why I built it',
        body: 'Reading Japanese novels on a phone meant selecting passages in a browser, copying them, opening Gemini or ChatGPT, and repeating that work for every chapter. Novel Hub removes that friction with an in-reader Japanese-to-Thai flow.',
      },
      {
        title: 'What I built',
        body: 'I built the Flutter client, Golang API, MongoDB data model, Kakuyomu import flow, favourites, and nightly new-chapter checks. Readers can translate a chapter in three taps or copy multiple chapters at once for an external AI workflow.',
      },
      {
        title: 'Zero-cost by design',
        body: 'The first version crawled and stored daily updates for every novel. That wasted free-tier MongoDB storage on books a reader might never open, so I switched to on-demand imports. The app now checks favourited titles nightly while keeping running costs at zero.',
      },
    ],
    highlights: [
      'Translate Japanese to Thai in three taps from the reader',
      'Import Kakuyomu novels by pasting a link',
      'Follow favourites with nightly new-chapter checks',
      'Copy multiple chapters without selecting text in a browser',
    ],
    tech: ['Flutter', 'Golang', 'MongoDB'],
    walkthrough: [
      {
        id: 'onboarding',
        title: 'Onboarding',
        summary: 'A short welcome flow introduces the app before social sign-in.',
        screens: [
          { image: novelHubWelcomeOne, label: 'Welcome 1', caption: 'First welcome screen.' },
          { image: novelHubWelcomeTwo, label: 'Welcome 2', caption: 'Second welcome screen.' },
          { image: novelHubWelcomeThree, label: 'Welcome 3', caption: 'Final welcome screen.' },
          { image: novelHubSocialLogin, label: 'Social login', caption: 'Sign in to start using Novel Hub.' },
        ],
      },
      {
        id: 'home',
        title: 'Home tab',
        summary: 'Continue reading and see newly available chapters in one place.',
        screens: [
          { image: novelHubHome, label: 'Home', caption: 'Start or continue reading.' },
          { image: novelHubNewChapters, label: 'New chapters', caption: 'See recent updates from followed novels.' },
        ],
      },
      {
        id: 'library',
        title: 'Library tab',
        summary: 'Keep currently reading, favourite, and finished novels organised.',
        screens: [
          { image: novelHubLibrary, label: 'Library', caption: 'Organise the novels you are reading, favourited, or finished.' },
        ],
      },
      {
        id: 'browse',
        title: 'Browse tab',
        summary: 'Browse the collection, narrow it with filters, or add a Kakuyomu novel directly from its URL.',
        screens: [
          { image: novelHubBrowse, label: 'Browse', caption: 'Explore the available novel collection.' },
          { image: novelHubFilters, label: 'Browse filters', caption: 'Narrow the catalogue before choosing a title.' },
          { image: novelHubPreview, label: 'Add a novel', caption: 'Paste a Kakuyomu URL to import a title on demand.' },
        ],
      },
      {
        id: 'novel-detail',
        title: 'Novel detail & translation',
        summary: 'Open a novel, read a chapter, and translate Japanese to Thai in three taps without leaving the reader.',
        screens: [
          { image: novelHubDetail, label: 'Novel detail', caption: 'Review the story before reading.' },
          { image: novelHubReader, label: 'Reader', caption: 'Read long-form Japanese content on mobile.' },
          { image: novelHubDarkReader, label: 'Dark reader', caption: 'Change to a night-friendly theme.' },
          { image: novelHubEpisodeReader, label: 'Episode controls', caption: 'Move to the next episode from the reader.' },
          { image: novelHubTranslation, label: 'Thai translation', caption: 'Translate Japanese content directly in the reader.' },
          { image: novelHubReaderSettings, label: 'Reader settings', caption: 'Adjust reading options inside a chapter.' },
          { image: novelHubEpisodes, label: 'Episode list', caption: 'Jump directly to any episode.' },
        ],
      },
      {
        id: 'profile',
        title: 'Profile tab',
        summary: 'Manage the reader profile and account settings.',
        screens: [
          { image: novelHubProfile, label: 'Profile', caption: 'Profile and account controls.' },
        ],
      },
    ],
    links: {
      github: null,
      demo: null,
      repositories: [
        { label: 'Mobile app · Flutter', url: 'https://github.com/Noraluk/novel-translator-mobile' },
        { label: 'API · Golang', url: 'https://github.com/Noraluk/novel-translator-api' },
        { label: 'Legacy crawler · v1', url: 'https://github.com/Noraluk/novel-translator-crawler' },
      ],
    },
  },
]
