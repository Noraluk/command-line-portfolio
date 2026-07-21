import { useCallback, useRef, useState } from 'react'
import ProjectWindow from './ProjectWindow'
import { ProjectWindowsContext } from './projectWindowsContext'
import './ProjectWindows.css'

// Shared window manager. Any component under the provider can call open(project)
// to pop a project into a floating terminal window; the provider renders the
// window layer (fixed overlay) and a dock for minimized windows.
export default function ProjectWindowsProvider({ children }) {
  const [wins, setWins] = useState([])
  const zRef = useRef(20)

  const patch = useCallback(
    (id, changes) =>
      setWins((prev) => prev.map((w) => (w.project.id === id ? { ...w, ...changes } : w))),
    [],
  )

  const open = useCallback((project) => {
    const z = (zRef.current += 1)
    setWins((prev) => {
      if (prev.some((w) => w.project.id === project.id)) {
        return prev.map((w) =>
          w.project.id === project.id ? { ...w, minimized: false, z } : w,
        )
      }
      const offset = prev.length * 26
      return [
        ...prev,
        { project, minimized: false, maximized: false, z, x: 48 + offset, y: 72 + offset },
      ]
    })
  }, [])

  const close = useCallback((id) => setWins((prev) => prev.filter((w) => w.project.id !== id)), [])
  const closeAll = useCallback(() => setWins([]), [])
  const focus = useCallback((id) => patch(id, { z: (zRef.current += 1) }), [patch])
  const minimize = useCallback((id) => patch(id, { minimized: true }), [patch])
  const restore = useCallback((id) => patch(id, { minimized: false, z: (zRef.current += 1) }), [patch])
  const toggleMax = useCallback(
    (id) => setWins((prev) => prev.map((w) => (w.project.id === id ? { ...w, maximized: !w.maximized } : w))),
    [],
  )
  const move = useCallback((id, x, y) => patch(id, { x, y }), [patch])

  const minimized = wins.filter((w) => w.minimized)

  return (
    <ProjectWindowsContext.Provider value={{ open, closeAll }}>
      {children}

      <div className="pw-layer">
        {wins
          .filter((w) => !w.minimized)
          .map((w) => (
            <ProjectWindow
              key={w.project.id}
              project={w.project}
              maximized={w.maximized}
              x={w.x}
              y={w.y}
              z={w.z}
              onClose={() => close(w.project.id)}
              onMinimize={() => minimize(w.project.id)}
              onToggleMax={() => toggleMax(w.project.id)}
              onFocus={() => focus(w.project.id)}
              onMove={(x, y) => move(w.project.id, x, y)}
            />
          ))}
      </div>

      {minimized.length > 0 && (
        <div className="pw-dock" aria-label="Minimized windows">
          {minimized.map((w) => (
            <button
              key={w.project.id}
              type="button"
              className="pw-dock__item"
              onClick={() => restore(w.project.id)}
            >
              <span className="pw-dock__dot" aria-hidden="true" />
              {w.project.name}
            </button>
          ))}
        </div>
      )}
    </ProjectWindowsContext.Provider>
  )
}
