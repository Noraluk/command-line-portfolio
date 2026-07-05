import { render, screen } from '@testing-library/react'
import ImageFrame from './ImageFrame'

describe('ImageFrame', () => {
  it('shows a placeholder when no src is given', () => {
    render(<ImageFrame label="pay-widget" />)
    expect(screen.getByText('no preview yet')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders the image when a src is given', () => {
    render(<ImageFrame src="/shot.png" alt="a screenshot" />)
    const img = screen.getByRole('img', { name: 'a screenshot' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/shot.png')
    expect(screen.queryByText('no preview yet')).not.toBeInTheDocument()
  })
})
