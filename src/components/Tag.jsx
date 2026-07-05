import './Tag.css'

// A small monospace chip, e.g. a tech label like `React`. Props in, JSX out.
export default function Tag({ children }) {
  return <span className="tag">{children}</span>
}
