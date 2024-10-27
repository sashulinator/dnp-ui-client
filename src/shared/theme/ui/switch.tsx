import Flex from '~dnp/shared/flex'
import Switch from '~dnp/shared/switch'
import Text from '~dnp/shared/text'
import { c } from '~dnp/utils/core'
import { useSubscribeUpdate } from '~dnp/utils/core-hooks'

import { globalController } from '../models/global-controller'
import { themeName } from '../models/theme-name'

export interface Props {
  className?: string | undefined
}

const NAME = 'dnp-theme-Switch'

/**
 * ui-Theme-w-Switch'
 */
export default function Component(props: Props): JSX.Element {
  useSubscribeUpdate(globalController.subscribe)

  const isDark = globalController.get().name === themeName.dark

  return (
    <Text as='label' size='2'>
      <Flex gap='2'>
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => {
            globalController.set({ name: checked ? themeName.dark : themeName.light })
          }}
          className={c(props.className, NAME)}
        />
        Dark
      </Flex>
    </Text>
  )
}

Component.displayName = NAME

/**
 * export
 */

export { type Props as SwitchProps }
