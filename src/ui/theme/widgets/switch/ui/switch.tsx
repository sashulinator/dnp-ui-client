import { useEffect, useState } from 'react'
import { eventBus } from '~/shared/event-bus'
import Flex from '~/ui/flex'
import Switch from '~/ui/switch'
import Text from '~/ui/text'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const displayName = 'ui-Theme-w-Switch'

/**
 * ui-Theme-w-Switch'
 */
export default function Component(props: Props): JSX.Element {
  const [isOn, setOn] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    const name = isOn ? 'dark' : 'light'
    localStorage.setItem('theme', name)
    eventBus.emit('setTheme', name)
  }, [isOn])

  return (
    <Text as='label' size='2'>
      <Flex gap='2'>
        <Switch checked={isOn} onCheckedChange={setOn} className={c(props.className, displayName)} />
        Dark
      </Flex>
    </Text>
  )
}
Component.displayName = displayName
