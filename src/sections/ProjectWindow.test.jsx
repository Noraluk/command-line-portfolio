import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectWindow from './ProjectWindow'
import { PROJECTS } from '../lib/constants'

const project = PROJECTS[0]
const walkthroughProject = PROJECTS.find((p) => p.walkthrough)
const dofarmProject = PROJECTS.find((p) => p.id === 'dofarm')

function setup(overrides = {}) {
  const handlers = {
    onClose: vi.fn(),
    onMinimize: vi.fn(),
    onToggleMax: vi.fn(),
    onFocus: vi.fn(),
    onMove: vi.fn(),
  }
  render(
    <ProjectWindow
      project={project}
      maximized={false}
      x={10}
      y={10}
      z={20}
      {...handlers}
      {...overrides}
    />,
  )
  return handlers
}

describe('ProjectWindow', () => {
  it('renders the project detail', () => {
    setup()
    expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument()
    expect(screen.getByText(project.tech[0])).toBeInTheDocument()
    expect(screen.getByText(project.highlights[0])).toBeInTheDocument()
    if (project.links.demo) {
      expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
        'href',
        project.links.demo,
      )
    }
    if (project.links.github) {
      expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
        'href',
        project.links.github,
      )
    }
    if (project.walkthrough) {
      expect(screen.getByRole('region', { name: /product walkthrough/i })).toBeInTheDocument()
      const defaultFlow = project.walkthrough[0]
      expect(screen.getAllByRole('link', { name: /open .* screenshot/i })).toHaveLength(
        defaultFlow.screens.length,
      )
    }
  })

  it('renders a selected walkthrough flow from the group menu', async () => {
    const user = userEvent.setup()
    setup({ project: walkthroughProject })

    const firstFlow = walkthroughProject.walkthrough[0]
    expect(screen.getByRole('heading', { name: firstFlow.title })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /open .* screenshot/i })).toHaveLength(
      firstFlow.screens.length,
    )

    const nextFlow = walkthroughProject.walkthrough[1]
    await user.click(screen.getByRole('button', { name: nextFlow.title }))
    expect(screen.getByRole('heading', { name: nextFlow.title })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /open .* screenshot/i })).toHaveLength(
      nextFlow.screens.length,
    )
  })

  it('renders app-store links when a project provides them', () => {
    setup({ project: dofarmProject })
    for (const store of dofarmProject.links.stores) {
      expect(screen.getByRole('link', { name: `> ${store.label}` })).toHaveAttribute('href', store.url)
    }
  })

  it('fires the window controls', async () => {
    const user = userEvent.setup()
    const h = setup()
    await user.click(screen.getByRole('button', { name: /close/i }))
    await user.click(screen.getByRole('button', { name: /minimize/i }))
    await user.click(screen.getByRole('button', { name: /maximize/i }))
    expect(h.onClose).toHaveBeenCalledTimes(1)
    expect(h.onMinimize).toHaveBeenCalledTimes(1)
    expect(h.onToggleMax).toHaveBeenCalledTimes(1)
  })

  it('shows a Restore control when maximized', () => {
    setup({ maximized: true })
    expect(screen.getByRole('button', { name: /restore/i })).toBeInTheDocument()
  })

  it('reports movement when dragged by the title bar', () => {
    const h = setup()
    const bar = screen.getByRole('dialog').querySelector('.pw__bar')
    fireEvent.pointerDown(bar, { clientX: 100, clientY: 100, pointerId: 1 })
    fireEvent.pointerMove(bar, { clientX: 130, clientY: 120, pointerId: 1 })
    fireEvent.pointerUp(bar, { pointerId: 1 })
    // origin (10,10) + delta (30,20)
    expect(h.onMove).toHaveBeenLastCalledWith(40, 30)
  })
})
