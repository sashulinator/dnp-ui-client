/**
 * ui
 */
import { default as Controller } from '../../app/route/ui/controller'

/**
 * models
 */
import { routes as bussinessRoutes } from './models/bussiness-routes'
import { publicRoutes } from './models/public-routes'

export { bussinessRoutes, publicRoutes }
export const routes = { ...bussinessRoutes, ...publicRoutes }

export { default as Provider } from '../../app/route/ui/provider'
export { history } from '../../app/route/ui/provider'

export { type AppRoute } from './models/app-route'

export { Controller }
export { type ControllerProps } from '../../app/route/ui/controller'

export type { Route } from '../../app/route/models/route'

/**
 * lib
 */

export { toAbsolute } from './lib/to-absolute'
export { getCurrent } from './lib/get-current'
export { getReturnRedirect, setReturnRedirect } from './lib/return-redirect'
