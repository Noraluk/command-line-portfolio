import { PROJECTS } from '../lib/constants'
import { useProjectWindows } from './projectWindowsContext'
import './ProjectBrowser.css'

// The clickable project index. Selecting a row opens it in a floating window
// (managed by ProjectWindowsProvider) rather than swapping content inline.
export default function ProjectBrowser() {
  const { open } = useProjectWindows()

  return (
    <div className="pb">
      <div className="pb-list">
        <p className="pb-hint">select a project to open it in a new window:</p>
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
      </div>
    </div>
  )
}
