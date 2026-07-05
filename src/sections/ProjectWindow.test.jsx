import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectWindow from './ProjectWindow'
import { PROJECTS } from '../lib/constants'

// A project that has both a github and a demo link, to exercise both branches.
const project = PROJECTS.find((p) => p.links.demo && p.links.github)

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
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      project.links.demo,
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      project.links.github,
    )
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
