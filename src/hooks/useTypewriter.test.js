import { renderHook, act } from '@testing-library/react'
import { useTypewriter } from './useTypewriter'
import { setReducedMotion } from '../test/setup'

describe('useTypewriter', () => {
  it('reveals text one character at a time', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useTypewriter('hi', 10))

    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(false)

    act(() => vi.advanceTimersByTime(10))
    expect(result.current[0]).toBe('h')

    act(() => vi.advanceTimersByTime(10))
    expect(result.current[0]).toBe('hi')
    expect(result.current[1]).toBe(true)

    vi.useRealTimers()
  })

  it('shows the full text immediately under reduced motion', () => {
    setReducedMotion(true)
    const { result } = renderHook(() => useTypewriter('hello'))
    expect(result.current[0]).toBe('hello')
    expect(result.current[1]).toBe(true)
  })

  it('is done immediately for empty text', () => {
    const { result } = renderHook(() => useTypewriter(''))
    expect(result.current[1]).toBe(true)
  })
})
