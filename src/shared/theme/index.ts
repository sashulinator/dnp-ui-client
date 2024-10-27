/**
 * ui
 */
import { default as ThemeProvider } from './ui/provider'

export default ThemeProvider
export type { Props as ThemePoviderProps } from './ui/provider'

/**
 * models
 */

export { themeName, type ThemeName } from './models/theme-name'
export { globalController } from './models/global-controller'

/**
 * widgets
 */
export { default as Switch, type SwitchProps } from './ui/switch'
