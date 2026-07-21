import { createContext, useContext } from 'react'

// Shared between ProjectWindowsProvider and its consumers. Kept in its own
// module so the provider file only exports a component (keeps Fast Refresh happy).
export const ProjectWindowsContext = createContext({ open: () => {}, closeAll: () => {} })

export function useProjectWindows() {
  return useContext(ProjectWindowsContext)
}
