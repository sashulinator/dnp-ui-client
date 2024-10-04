import { createContext, useContext as reactUseContext } from 'react'

import { assertDefined } from '~/utils/core'

import type { Explorer, Item, Path } from '../../../models/explorer'

export interface ContextProps<TItem extends Item> {
  data: Explorer<TItem> | undefined
  loading: boolean | undefined
  paths: Path[]
  context?: Record<string, unknown> | undefined
  onPathChange?: (paths: Path[]) => void
}

export const context = createContext<ContextProps<Item> | undefined>(undefined)

export function useContext<TItem extends Item>() {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx as ContextProps<TItem>
}
