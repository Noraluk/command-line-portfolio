import { useState } from 'react'
import { PROJECTS } from '../lib/constants'
import Tag from '../components/Tag'
import ImageFrame from '../components/ImageFrame'
import './ProjectBrowser.css'

// The clickable project index. Selecting a row opens its detail.
function ProjectList({ onSelect }) {
  return (
    <div className="pb-list" role="list">
      <p className="pb-hint">select a project to view details:</p>
      {PROJECTS.map((p, i) => (
        <button
          key={p.id}
          role="listitem"
          className="pb-row"
          onClick={() => onSelect(p.id)}
        >
          <span className="pb-row__idx">[{i + 1}]</span>
          <span className="pb-row__name">{p.name}</span>
          <span className="pb-row__tagline">{p.tagline}</span>
          <span className="pb-row__go" aria-hidden="true">→</span>
        </button>
      ))}
    </div>
  )
}

// Full detail card for one project: image slot, description, highlights,
// tech tags and links, with a way back to the list.
function ProjectDetail({ project, onBack }) {
  const { name, year, status, description, highlights, tech, links, image } = project
  return (
    <div className="pb-detail">
      <button className="pb-back" onClick={onBack}>← back to projects</button>

      <div className="pb-detail__head">
        <h2 className="pb-detail__name">{name}</h2>
        <span className="pb-detail__meta">{status} · {year}</span>
      </div>

      <ImageFrame src={image} alt={`${name} screenshot`} label={name} />

      <p className="pb-detail__desc">{description}</p>

      <ul className="pb-detail__highlights">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <div className="pb-detail__tech">
        {tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="pb-detail__links">
        {links.github && (
          <a className="pb-link" href={links.github} target="_blank" rel="noreferrer">
            &gt; github
          </a>
        )}
        {links.demo && (
          <a className="pb-link" href={links.demo} target="_blank" rel="noreferrer">
            &gt; live demo
          </a>
        )}
      </div>
    </div>
  )
}

// Interactive projects block. Holds its own selection state so navigating
// between list and detail never touches the terminal's frozen history.
export default function ProjectBrowser() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = PROJECTS.find((p) => p.id === selectedId)

  return (
    <div className="pb">
      {selected ? (
        <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <ProjectList onSelect={setSelectedId} />
      )}
    </div>
  )
}
