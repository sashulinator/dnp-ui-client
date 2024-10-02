/**
 * ui
 */
import { default as RootRoutes } from './ui/root-routes'

export { RootRoutes }
export { type Props as RootRouteProps } from './ui/root-routes'

/**
 * models
 */

export type { Route } from './models/route'
export { routeMap } from './models/route-map'

/**
 * lib
 */

export { toAbsolute } from './lib/to-absolute'
export { getCurrent } from './lib/get-current'
