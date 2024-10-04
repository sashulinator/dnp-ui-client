import { createContext, useContext as reactUseContext } from 'react'

import { assertDefined } from '~/utils/core'

import type { Explorer, Path } from '../../../models/explorer'

export interface ContextProps {
  data: Explorer | undefined
  loading: boolean | undefined
  paths: Path[]
  context?: Record<string, unknown> | undefined
  onPathChange?: (paths: Path[]) => void
}

export const context = createContext<ContextProps | undefined>(undefined)

export function useContext() {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
