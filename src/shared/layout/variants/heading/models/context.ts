import { createContext } from 'react'
import { Route } from '~/lib/route'

export interface ContextProps {
  route?: Route
  backRoute?: Route | undefined
  loading?: boolean | undefined
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => JSX.Element
}

export const context = createContext<ContextProps>({})
