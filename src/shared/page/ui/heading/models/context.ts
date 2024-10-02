import { createContext, useContext as reactUseContext } from 'react'

import { type Route } from '~/shared/route'
import { assertDefined } from '~/utils/core'

export interface Context {
  route: Route
  backRoute: Route | undefined
  loading: boolean | undefined
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => JSX.Element
}

export const context = createContext<Context | undefined>(undefined)

export function useContext(): Context {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
