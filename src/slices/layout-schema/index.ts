/**
 * ui
 */
import { default as LayoutSchema } from '~/shared/layout-schema'

export default LayoutSchema
export type { LayoutSchemaProps } from '~/shared/layout-schema'

/**
 * types
 */

export type * from './types'

/**
 * constants
 */

export { componentMap } from './constants'

export * as Components from './components'

/**
 * lib
 */

export { propToFunction } from './lib.prop-to-function'
export { splitProps } from './lib.split-props'
