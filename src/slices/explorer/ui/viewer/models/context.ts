import { createContext, useContext as reactUseContext } from 'react'

import { type Any, assertDefined } from '~dnp/utils/core'

import type { Explorer, Item, Path } from '../../../models/explorer'

export interface Context<TItem extends Item> {
  explorer: Explorer<TItem> | undefined
  loading?: boolean | undefined
  paths: Path[]
  onPathChange?: (paths: Path[], item?: TItem) => void
}

// Делаем Any так как тип определяется динамически
export const context = createContext<Context<Any> | undefined>(undefined)

export function useContext<TItem extends Item>() {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx as Context<TItem>
}
