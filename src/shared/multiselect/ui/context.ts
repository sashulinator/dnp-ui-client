import { createContext, useContext as reactUseContext } from 'react'

import { assertDefined } from '~/utils/core'

export interface Context {
  value: string[]
  onValueChange: (value: string[]) => void
  open: boolean
  setOpen: (isOpen: boolean) => void
}

export const context = createContext<Context | undefined>(undefined)

export function useContext(): Context {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
