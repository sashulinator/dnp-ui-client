import { type Route } from './route'

export type AppRoute = Route<{
  renderHeader?: () => React.ReactNode
  renderNav?: () => React.ReactNode
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => React.ReactNode
  navigatable?: boolean | undefined
  iconColor?: 'red'
  rolesAllowed?: string[]
}>
