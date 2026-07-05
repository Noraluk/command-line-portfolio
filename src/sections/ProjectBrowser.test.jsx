import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectWindowsProvider from './ProjectWindows'
import ProjectBrowser from './ProjectBrowser'
import { PROJECTS } from '../lib/constants'

function renderBrowser() {
  return render(
    <ProjectWindowsProvider>
      <ProjectBrowser />
    </ProjectWindowsProvider>,
  )
}

describe('ProjectBrowser', () => {
  it('lists every project', () => {
    renderBrowser()
    expect(screen.getByText(/select a project/i)).toBeInTheDocument()
    for (const p of PROJECTS) {
      expect(screen.getByText(p.name)).toBeInTheDocument()
    }
  })

  it('opens the selected project in a window', async () => {
    const user = userEvent.setup()
    renderBrowser()
    const first = PROJECTS[0]
    await user.click(screen.getByText(first.name))
    expect(
      screen.getByRole('dialog', { name: new RegExp(first.name) }),
    ).toBeInTheDocument()
  })
})
