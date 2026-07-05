import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the terminal', () => {
    render(<App />)
    expect(
      screen.getByRole('application', { name: /terminal portfolio/i }),
    ).toBeInTheDocument()
  })
})
