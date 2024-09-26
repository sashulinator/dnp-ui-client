import { createContext } from 'react'

import type { Explorer, Path } from '../../../models/explorer'

export interface ContextProps {
  data?: Explorer | undefined
  loading?: boolean | undefined
  paths?: Path[] | undefined
  context?: Record<string, unknown> | undefined
  onPathChange?: (paths: Path[]) => void
}

export const context = createContext<ContextProps>({})
