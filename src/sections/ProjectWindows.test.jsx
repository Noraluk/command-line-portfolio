import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectWindowsProvider from './ProjectWindows'
import { useProjectWindows } from './projectWindowsContext'
import { PROJECTS } from '../lib/constants'

// Minimal harness that drives the provider's open().
function Opener() {
  const { open } = useProjectWindows()
  return (
    <button type="button" onClick={() => open(PROJECTS[0])}>
      open
    </button>
  )
}

function renderWindows() {
  return render(
    <ProjectWindowsProvider>
      <Opener />
    </ProjectWindowsProvider>,
  )
}

const name = PROJECTS[0].name

describe('ProjectWindows', () => {
  it('opens, minimizes to the dock, restores, then closes', async () => {
    const user = userEvent.setup()
    renderWindows()

    await user.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByRole('dialog', { name: new RegExp(name) })).toBeInTheDocument()

    // minimize → window hidden, dock chip appears
    await user.click(screen.getByRole('button', { name: /minimize/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // restore from the dock chip (button labelled with the project name)
    await user.click(screen.getByRole('button', { name: new RegExp(name) }))
    expect(screen.getByRole('dialog', { name: new RegExp(name) })).toBeInTheDocument()

    // maximize toggles the green control to "Restore"
    await user.click(screen.getByRole('button', { name: /maximize/i }))
    expect(screen.getByRole('button', { name: /restore/i })).toBeInTheDocument()

    // close removes it entirely
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not open duplicate windows for the same project', async () => {
    const user = userEvent.setup()
    renderWindows()
    const openBtn = screen.getByRole('button', { name: 'open' })
    await user.click(openBtn)
    await user.click(openBtn)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
  })
})
