import { MENU, OUTPUT, PROJECTS, BOOT_LINES, USER, HOST } from './constants'

describe('constants', () => {
  it('exposes a session identity', () => {
    expect(USER).toBeTruthy()
    expect(HOST).toBeTruthy()
    expect(BOOT_LINES.length).toBeGreaterThan(0)
  })

  it('has a 4-item menu with unique keys and ids', () => {
    expect(MENU).toHaveLength(4)
    const keys = MENU.map((m) => m.key)
    const ids = MENU.map((m) => m.id)
    expect(new Set(keys).size).toBe(4)
    expect(new Set(ids).size).toBe(4)
  })

  it('has output text for every text command', () => {
    for (const id of ['about', 'skills', 'contact', 'help', 'welcome']) {
      expect(typeof OUTPUT[id]).toBe('string')
      expect(OUTPUT[id].length).toBeGreaterThan(0)
    }
    // `projects` is interactive, not a text blob.
    expect(OUTPUT.projects).toBeUndefined()
  })

  it('gives every project the fields the UI reads', () => {
    expect(PROJECTS.length).toBeGreaterThan(0)
    const ids = new Set()
    for (const p of PROJECTS) {
      expect(p.id).toBeTruthy()
      ids.add(p.id)
      expect(p.name).toBeTruthy()
      expect(p.tagline).toBeTruthy()
      expect(typeof p.description).toBe('string')
      expect(Array.isArray(p.highlights)).toBe(true)
      expect(Array.isArray(p.tech)).toBe(true)
      expect(p.links).toBeTypeOf('object')
      expect('github' in p.links).toBe(true)
      expect('demo' in p.links).toBe(true)
    }
    expect(ids.size).toBe(PROJECTS.length) // ids are unique
  })
})
