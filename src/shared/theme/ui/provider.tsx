import { Theme } from '@radix-ui/themes'

import { useSubscribeUpdate } from '~dnp/utils/core-hooks'

import { globalController } from '../models/global-controller'

export interface Props {
  children: React.ReactNode
}

const NAME = 'theme-Provider'

/**
 * theme-ThemeProvider
 */
export default function Component(props: Props): JSX.Element {
  useSubscribeUpdate(globalController.subscribe)

  return <Theme appearance={globalController.get().name}>{props.children}</Theme>
}

Component.displayName = NAME

/**
 * export
 */

export { type Props as ProviderProps }
