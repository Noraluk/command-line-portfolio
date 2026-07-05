import { useEffect, useState } from 'react'

// Whether the user has asked the OS to minimize motion. Read at mount time
// (inside the hook) rather than at module load so it stays testable.
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

// Reveals `text` one character at a time. Returns [shown, done].
// Runs once per mount — older terminal lines stay fully rendered.
// Under prefers-reduced-motion the text appears at once (done immediately).
export function useTypewriter(text, speed = 12) {
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? text.length : 0,
  )

  useEffect(() => {
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(id)
  }, [count, text.length, speed])

  return [text.slice(0, count), count >= text.length]
}
