/**
 * ui
 */
import { default as Controller } from '../../app/route/ui/controller'
import { default as Provider } from '../../app/route/ui/provider'

/**
 * models
 */

export { routes } from './models/routes'
export { type AppRoute } from './models/app-route'

export { Controller }
export { type ControllerProps } from '../../app/route/ui/controller'

export { Provider }
export { type ProviderProps } from '../../app/route/ui/provider'

export type { Route } from '../../app/route/models/route'

/**
 * lib
 */

export { toAbsolute } from './lib/to-absolute'
export { getCurrent } from './lib/get-current'
