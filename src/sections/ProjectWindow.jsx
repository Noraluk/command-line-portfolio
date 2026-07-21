import { useRef, useState } from 'react'
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
  const {
    name,
    year,
    status,
    description,
    role,
    detailSections,
    highlights,
    tech,
    links,
    image,
    imageAspect,
    walkthrough,
  } = project
  const drag = useRef(null)
  const [activeFlow, setActiveFlow] = useState(
    () => Math.max(0, walkthrough?.findIndex((flow) => flow.id === 'novel-detail') ?? 0),
  )
  const selectedFlow = walkthrough?.[activeFlow]

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
        {role && <p className="pw__role">{role}</p>}

        <ImageFrame
          src={image}
          alt={`${name} screenshot`}
          label={name}
          aspect={imageAspect}
        />

        <p className="pw__desc">{description}</p>

        {detailSections?.map(({ title, body }) => (
          <section className="pw__detail" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        ))}

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

        {walkthrough?.length > 0 && selectedFlow && (
          <section className="pw__flows" aria-label={`${name} product walkthrough`}>
            <div className="pw__journey-head">
              <h3>Product walkthrough</h3>
              <p>Follow each part of the app through the screens in the order a reader uses them.</p>
            </div>
            <div className="pw__flow-menu" aria-label="Walkthrough groups">
              {walkthrough.map((flow, index) => (
                <button
                  type="button"
                  className={`pw__flow-menu-btn${index === activeFlow ? ' pw__flow-menu-btn--active' : ''}`}
                  aria-pressed={index === activeFlow}
                  onClick={() => setActiveFlow(index)}
                  key={flow.id}
                >
                  {flow.title}
                </button>
              ))}
            </div>
            <section className="pw__flow-panel" aria-labelledby={`flow-${selectedFlow.id}`}>
              <div className="pw__flow-head">
                <h4 id={`flow-${selectedFlow.id}`}>{selectedFlow.title}</h4>
                <p>{selectedFlow.summary}</p>
              </div>
              <div className="pw__flow-viewport">
                <ol className="pw__flow-rail">
                  {selectedFlow.screens.map(({ image: screenshot, label, caption }) => (
                    <li className="pw__flow-item" key={label}>
                      <figure className="pw__flow-screen">
                        <a
                          href={screenshot}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${label} screenshot`}
                        >
                          <img src={screenshot} alt={`${selectedFlow.title}: ${label}`} loading="lazy" />
                        </a>
                        <figcaption>
                          <strong>{label}</strong>
                          <span>{caption}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </section>
        )}

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
          {links.repositories?.map(({ label, url }) => (
            <a className="pw__link" href={url} target="_blank" rel="noreferrer" key={url}>
              &gt; {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
