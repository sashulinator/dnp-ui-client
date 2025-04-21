import { createContext, useContext as reactUseContext } from 'react'

import { assertDefined } from '~/utils/core'

import type { Option } from './types'

export interface Context {
  value: string[]
  options: Option[]
  onValueChange: (value: string[]) => void
}

export const context = createContext<Context | undefined>(undefined)

export function useContext(): Context {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
