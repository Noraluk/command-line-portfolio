import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Terminal from './Terminal'
import { PROJECTS } from '../lib/constants'
import { setReducedMotion } from '../test/setup'

// With reduced motion on, the typewriter completes instantly, so boot finishes
// and command output lands without advancing timers — ideal for interaction.
describe('Terminal (reduced motion)', () => {
  beforeEach(() => setReducedMotion(true))

  it('shows the menu after boot', () => {
    render(<Terminal />)
    expect(screen.getByRole('button', { name: /About Me/ })).toBeInTheDocument()
    expect(screen.getByText(/Welcome to noraluk/i)).toBeInTheDocument()
  })

  it('runs a text command from a menu click', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.click(screen.getByRole('button', { name: /About Me/ }))
    expect(screen.getByText(/Noraluk Chotibuth/)).toBeInTheDocument()
  })

  it('opens the interactive project browser', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.click(screen.getByRole('button', { name: /Featured Projects/ }))
    expect(screen.getByText(/select a project/i)).toBeInTheDocument()
  })

  it('opens a project in a floating window from the browser', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.click(screen.getByRole('button', { name: /Featured Projects/ }))
    await user.click(screen.getByText(PROJECTS[0].name))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('runs a command typed at the prompt', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'contact{Enter}')
    expect(screen.getByText(/noraluk\.kn@gmail\.com/)).toBeInTheDocument()
  })

  it('reports unknown commands', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.type(screen.getByRole('textbox'), 'zzz{Enter}')
    expect(screen.getByText(/command not found: zzz/)).toBeInTheDocument()
  })

  it('clears history with the clear button', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.click(screen.getByRole('button', { name: /About Me/ }))
    expect(screen.getByText(/Noraluk Chotibuth/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Clear/ }))
    expect(screen.queryByText(/Noraluk Chotibuth/)).not.toBeInTheDocument()
  })

  it('recalls previous commands with Arrow Up / Down', async () => {
    const user = userEvent.setup()
    render(<Terminal />)
    await user.type(screen.getByRole('textbox'), 'about{Enter}')

    // The prompt remounts once the command lands; grab the fresh input.
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')

    await user.type(input, '{ArrowUp}')
    expect(input).toHaveValue('about')

    await user.type(input, '{ArrowDown}')
    expect(input).toHaveValue('')
  })
})

// With motion on we can observe the boot animation and the "typing" state.
describe('Terminal (animated)', () => {
  beforeEach(() => setReducedMotion(false))

  it('hides the menu until boot is skipped by click', () => {
    const { container } = render(<Terminal />)
    expect(screen.queryByRole('button', { name: /About Me/ })).not.toBeInTheDocument()
    fireEvent.click(container.querySelector('.term-screen'))
    expect(screen.getByRole('button', { name: /About Me/ })).toBeInTheDocument()
  })

  it('skips boot on any keypress', () => {
    render(<Terminal />)
    fireEvent.keyDown(window, { key: 'x' })
    expect(screen.getByRole('button', { name: /About Me/ })).toBeInTheDocument()
  })

  it('hides the menu while output types, then restores it', async () => {
    // Real timers: let the typewriter run and wait for it to finish. Use a
    // short (unknown-command) output so the test stays fast.
    const user = userEvent.setup()
    const { container } = render(<Terminal />)
    fireEvent.click(container.querySelector('.term-screen'))

    await user.type(screen.getByRole('textbox'), 'zzz{Enter}')
    expect(screen.getByText('typing…')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /About Me/ })).not.toBeInTheDocument()

    // The menu only comes back once output has fully typed (busy → false).
    await screen.findByRole('button', { name: /About Me/ }, { timeout: 8000 })
    expect(screen.queryByText('typing…')).not.toBeInTheDocument()
    expect(screen.getByText(/command not found: zzz/)).toBeInTheDocument()
  })
})
