import { createContext, useContext as reactUseContext } from 'react'

import { assertDefined } from '~/utils/core'

import { type FilterConfig } from '../../../models/filter-config'

export interface Context {
  filterConfig: FilterConfig
  onFilterConfigChange: (filterConfig: FilterConfig) => void
}

export const context = createContext<Context | undefined>(undefined)

export function useContext(): Context {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
