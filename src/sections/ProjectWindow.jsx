import { useRef } from 'react'
import Tag from '../components/Tag'
import ImageFrame from '../components/ImageFrame'
import './ProjectWindow.css'

// A floating, terminal-styled window showing one project. The three title-bar
// dots are functional: close / minimize / maximize. Draggable by the title bar
// (unless maximized). Purely presentational — the parent owns window state.
export default function ProjectWindow({
  project,
  maximized,
  x,
  y,
  z,
  onClose,
  onMinimize,
  onToggleMax,
  onFocus,
  onMove,
}) {
  const { name, year, status, description, highlights, tech, links, image } = project
  const drag = useRef(null)

  const onPointerDown = (e) => {
    if (maximized) return
    drag.current = { sx: e.clientX, sy: e.clientY, ox: x, oy: y }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* not supported (e.g. jsdom) */
    }
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    onMove(
      drag.current.ox + (e.clientX - drag.current.sx),
      drag.current.oy + (e.clientY - drag.current.sy),
    )
  }
  const onPointerUp = (e) => {
    drag.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* no-op */
    }
  }

  const style = maximized
    ? { zIndex: z }
    : { zIndex: z, left: `${x}px`, top: `${y}px` }

  return (
    <section
      className={`pw${maximized ? ' pw--max' : ''}`}
      style={style}
      role="dialog"
      aria-label={`${name} — project window`}
      onMouseDown={onFocus}
    >
      <header
        className="pw__bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="pw__dots" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="pw__dot pw__dot--red"
            aria-label="Close"
            title="Close"
            onClick={onClose}
          />
          <button
            type="button"
            className="pw__dot pw__dot--yellow"
            aria-label="Minimize"
            title="Minimize"
            onClick={onMinimize}
          />
          <button
            type="button"
            className="pw__dot pw__dot--green"
            aria-label={maximized ? 'Restore' : 'Maximize'}
            title={maximized ? 'Restore' : 'Maximize'}
            onClick={onToggleMax}
          />
        </div>
        <span className="pw__title">{name} — ~/projects</span>
      </header>

      <div className="pw__body">
        <div className="pw__head">
          <h2 className="pw__name">{name}</h2>
          <span className="pw__meta">{year ? `${status} · ${year}` : status}</span>
        </div>

        <ImageFrame src={image} alt={`${name} screenshot`} label={name} />

        <p className="pw__desc">{description}</p>

        <ul className="pw__highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="pw__tech">
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="pw__links">
          {links.github && (
            <a className="pw__link" href={links.github} target="_blank" rel="noreferrer">
              &gt; github
            </a>
          )}
          {links.demo && (
            <a className="pw__link" href={links.demo} target="_blank" rel="noreferrer">
              &gt; live demo
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
