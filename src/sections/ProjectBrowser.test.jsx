import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectBrowser from './ProjectBrowser'
import { PROJECTS } from '../lib/constants'

describe('ProjectBrowser', () => {
  it('lists every project', () => {
    render(<ProjectBrowser />)
    expect(screen.getByText(/select a project/i)).toBeInTheDocument()
    for (const p of PROJECTS) {
      expect(screen.getByText(p.name)).toBeInTheDocument()
    }
  })

  it('opens a detail view when a project is selected, and goes back', async () => {
    const user = userEvent.setup()
    render(<ProjectBrowser />)

    const first = PROJECTS[0]
    await user.click(screen.getByText(first.name))

    // Detail view: heading, tech tags, back button.
    expect(screen.getByRole('heading', { name: first.name })).toBeInTheDocument()
    expect(screen.getByText(first.tech[0])).toBeInTheDocument()
    expect(screen.getByText(first.highlights[0])).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /back to projects/i }))
    expect(screen.getByText(/select a project/i)).toBeInTheDocument()
  })

  it('renders a live demo link for a project that has one', async () => {
    const user = userEvent.setup()
    const withDemo = PROJECTS.find((p) => p.links.demo)
    expect(withDemo).toBeDefined()

    render(<ProjectBrowser />)
    await user.click(screen.getByText(withDemo.name))

    const demo = screen.getByRole('link', { name: /live demo/i })
    expect(demo).toHaveAttribute('href', withDemo.links.demo)
  })
})
