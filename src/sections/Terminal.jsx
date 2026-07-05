import { useCallback, useEffect, useRef, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { MENU, OUTPUT, BOOT_LINES, USER, HOST } from '../lib/constants'
import ProjectBrowser from './ProjectBrowser'
import ProjectWindowsProvider from './ProjectWindows'
import './Terminal.css'

const BOOT_TEXT = BOOT_LINES.join('\n')

// Resolve a raw typed/clicked command into a known id, or null if unknown.
// Accepts the menu number ([1]-[4]), the command word, and a few aliases.
function resolveCommand(raw) {
  const v = raw.trim().toLowerCase()
  if (!v) return undefined
  const byKey = MENU.find((m) => m.key === v)
  if (byKey) return byKey.id
  if (['about', 'skills', 'contact', 'projects'].includes(v)) return v
  if (v === 'projects --list' || v === 'ls' || v === 'projects -l') return 'projects'
  if (v === 'help' || v === '?' || v === 'man') return 'help'
  if (v === 'clear' || v === 'cls') return 'clear'
  return null
}

function Prompt({ cmd }) {
  return (
    <div className="term-prompt">
      <span className="term-user">{USER}@{HOST}</span>
      <span className="term-path">:~$</span>
      <span className="term-cmd">{cmd}</span>
    </div>
  )
}

// Fake boot log typed out on first load. Calls onDone when finished (or
// immediately under prefers-reduced-motion). Click/press to skip.
function BootSequence({ onDone }) {
  const [shown, done] = useTypewriter(BOOT_TEXT, 18)
  useEffect(() => {
    if (done) onDone()
  }, [done, onDone])
  return (
    <pre className="term-output term-boot">
      {shown}
      {!done && <span className="term-caret" />}
    </pre>
  )
}

// One executed command entry. Text commands type out; the `projects` command
// renders the interactive browser (which manages its own selection state).
// Fires onDone once the output has fully appeared, so the terminal knows when
// it's safe to show the menu/prompt again.
function Entry({ cmd, kind, body, onDone }) {
  const [shown, done] = useTypewriter(kind === 'text' ? body : '')
  useEffect(() => {
    if (done) onDone()
  }, [done, onDone])
  return (
    <div className="term-entry">
      <Prompt cmd={cmd} />
      {kind === 'text' ? (
        <pre className="term-output">
          {shown}
          {!done && <span className="term-caret" />}
        </pre>
      ) : (
        <ProjectBrowser />
      )}
    </div>
  )
}

// The live, typeable prompt. Enter runs the command; Up/Down recalls past
// commands like a real shell. `past` is the list of previously-run strings.
function CommandInput({ past, onSubmit }) {
  const [value, setValue] = useState('')
  const [recall, setRecall] = useState(null) // index into `past`, newest last
  const ref = useRef(null)

  // Keep focus on the input whenever the prompt re-renders.
  useEffect(() => {
    ref.current?.focus()
  })

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(value)
      setValue('')
      setRecall(null)
    } else if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault()
      const i = recall === null ? past.length - 1 : Math.max(0, recall - 1)
      setRecall(i)
      setValue(past[i])
    } else if (e.key === 'ArrowDown' && recall !== null) {
      e.preventDefault()
      const i = recall + 1
      if (i >= past.length) {
        setRecall(null)
        setValue('')
      } else {
        setRecall(i)
        setValue(past[i])
      }
    }
  }

  return (
    <label className="term-inputline">
      <span className="term-user">{USER}@{HOST}</span>
      <span className="term-path">:~$</span>
      <input
        ref={ref}
        className="term-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="type a command… (try: help)"
        aria-label="Terminal command input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </label>
  )
}

// Live clock for the status bar. Ticks every second.
function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="term-clock">{time}</span>
}

export default function Terminal() {
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState([])
  const [past, setPast] = useState([]) // raw command strings, for Up/Down recall
  const [busy, setBusy] = useState(false) // true while the newest output is typing out
  const endRef = useRef(null)
  const inputRef = useRef(null)

  // Latest entry finished typing — safe to show the menu/prompt again.
  const handleEntryDone = useCallback(() => setBusy(false), [])

  // Run a raw command string (from a click or the input line).
  const execute = (raw) => {
    const cmd = raw.trim()
    if (!cmd || busy) return
    setPast((p) => (p[p.length - 1] === cmd ? p : [...p, cmd]))

    const id = resolveCommand(cmd)
    if (id === 'clear') {
      setHistory([])
      return
    }
    // Text/unknown output types out char-by-char; hide the menu until it lands.
    if (id !== 'projects') setBusy(true)
    setHistory((h) => [
      ...h,
      id === null
        ? {
            id: `err-${h.length}`,
            cmd,
            kind: 'text',
            body: `command not found: ${cmd}\ntype 'help' or click a command below.`,
          }
        : {
            id: `${id}-${h.length}`,
            cmd,
            kind: id === 'projects' ? 'projects' : 'text',
            body: OUTPUT[id],
          },
    ])
  }

  const clear = () => setHistory([])

  // Skip the boot animation on the first key/click.
  useEffect(() => {
    if (booted) return
    const skip = () => setBooted(true)
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [booted])

  // Keep the newest output in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [history, booted, busy])

  const focusInput = () => inputRef.current?.querySelector('input')?.focus()

  return (
    <ProjectWindowsProvider>
      <main className="term-window" role="application" aria-label="Terminal portfolio">
      <header className="term-bar">
        <span className="term-dot term-dot--red" />
        <span className="term-dot term-dot--yellow" />
        <span className="term-dot term-dot--green" />
        <span className="term-title">{USER}@{HOST}: ~/portfolio</span>
      </header>

      <div
        className="term-screen"
        onClick={() => (booted ? focusInput() : setBooted(true))}
      >
        {!booted ? (
          <BootSequence onDone={() => setBooted(true)} />
        ) : (
          <>
            <pre className="term-output term-welcome">{OUTPUT.welcome}</pre>

            {history.map((e) => (
              <Entry
                key={e.id}
                cmd={e.cmd}
                kind={e.kind}
                body={e.body}
                onDone={handleEntryDone}
              />
            ))}

            {busy ? (
              <p className="term-typing" aria-live="polite">typing…</p>
            ) : (
              <>
                <nav className="term-menu" aria-label="Commands">
                  {MENU.map((item) => (
                    <button
                      key={item.id}
                      className="term-menu-btn"
                      onClick={() => execute(item.cmd)}
                    >
                      <span className="term-key">[{item.key}]</span> {item.label}
                    </button>
                  ))}
                  <button
                    className="term-menu-btn term-menu-btn--util"
                    onClick={() => execute('help')}
                  >
                    <span className="term-key">[?]</span> Help
                  </button>
                  <button
                    className="term-menu-btn term-menu-btn--util"
                    onClick={clear}
                    disabled={history.length === 0}
                  >
                    <span className="term-key">[c]</span> Clear
                  </button>
                </nav>

                <div ref={inputRef}>
                  <CommandInput past={past} onSubmit={execute} />
                </div>
              </>
            )}
            <div ref={endRef} />
          </>
        )}
      </div>

      <footer className="term-status" aria-hidden="true">
        <span className="term-status__online">
          <span className="term-status__led" /> online
        </span>
        <span className="term-status__hint">type a command & press Enter, or click below · ↑ recalls history</span>
        <Clock />
      </footer>
      </main>
    </ProjectWindowsProvider>
  )
}
