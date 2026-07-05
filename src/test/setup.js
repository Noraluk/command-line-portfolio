import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Default: motion is ON (matches: false), so typewriter animation runs.
// A test can override per-case via setReducedMotion(true) before rendering.
function makeMatchMedia(reduced) {
  return vi.fn().mockImplementation((query) => ({
    matches: reduced && query.includes('reduce'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

export function setReducedMotion(reduced) {
  window.matchMedia = makeMatchMedia(reduced)
}

beforeEach(() => {
  setReducedMotion(false)
  // jsdom doesn't implement scrollIntoView; Terminal calls it on new output.
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
})
