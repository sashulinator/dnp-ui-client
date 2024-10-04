import { type Route } from './route'

export type AppRoute = Route<{
  renderHeader?: () => React.ReactNode
  renderNav?: () => React.ReactNode
  renderIcon?: (props: React.SVGAttributes<SVGSVGElement>) => React.ReactNode
  navigatable?: boolean | undefined
  rolesAllowed?: string[]
  /**
   * Конфигурация для корневого layout
   * @default '-configuration--app'
   */
  layoutConfiguration?: string | undefined
}>
