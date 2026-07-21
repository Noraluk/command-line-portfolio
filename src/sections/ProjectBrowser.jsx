import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../lib/constants'
import { useProjectWindows } from './projectWindowsContext'
import './ProjectBrowser.css'

// The clickable project index. Selecting a row opens it in a floating window
// (managed by ProjectWindowsProvider) rather than swapping content inline.
export default function ProjectBrowser({ onExit }) {
  const { open, closeAll } = useProjectWindows()
  const [command, setCommand] = useState('')
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const exit = () => {
    closeAll()
    onExit?.()
  }

  const submit = (e) => {
    e.preventDefault()
    const value = command.trim().toLowerCase()
    if (!value) return

    if (['exit', 'back', 'q'].includes(value)) {
      exit()
      return
    }

    const index = Number(value)
    const project = Number.isInteger(index) && index > 0
      ? PROJECTS[index - 1]
      : PROJECTS.find((item) => item.id === value || item.name.toLowerCase() === value)

    if (project) {
      open(project)
      setCommand('')
      setMessage(`opened ${project.name}`)
    } else {
      setMessage(`project not found: ${command}`)
    }
  }

  return (
    <div className="pb">
      <div className="pb-list">
        <div className="pb-head">
          <p className="pb-hint">select a project to open it in a new window:</p>
          {onExit && (
            <button type="button" className="pb-exit" onClick={exit}>
              &larr; back to main menu
            </button>
          )}
        </div>
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="pb-row"
            onClick={() => open(p)}
          >
            <span className="pb-row__idx">[{i + 1}]</span>
            <span className="pb-row__name">{p.name}</span>
            <span className="pb-row__tagline">{p.tagline}</span>
            <span className="pb-row__go" aria-hidden="true">↗</span>
          </button>
        ))}
        <form className="pb-prompt" onSubmit={submit}>
          <label htmlFor="project-command" className="pb-prompt__label">
            projects@{`~`}$
          </label>
          <input
            ref={inputRef}
            id="project-command"
            className="pb-prompt__input"
            value={command}
            onChange={(e) => {
              setCommand(e.target.value)
              setMessage('')
            }}
            placeholder="type 1–2 to open · exit to return"
            aria-label="Project command input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </form>
        {message && <p className="pb-message" aria-live="polite">{message}</p>}
      </div>
    </div>
  )
}
