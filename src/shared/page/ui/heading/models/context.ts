import { createContext, useContext as reactUseContext } from 'react'

import { type AppRoute } from '~/app/route'
import { assertDefined } from '~/utils/core'

export interface Context {
  route: AppRoute
  backRoute: AppRoute | undefined
  loading: boolean | undefined
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => JSX.Element
}

export const context = createContext<Context | undefined>(undefined)

export function useContext(): Context {
  const ctx = reactUseContext(context)
  assertDefined(ctx)
  return ctx
}
