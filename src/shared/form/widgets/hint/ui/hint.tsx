import Flex from '~dnp/shared/flex'
import Icon from '~dnp/shared/icon'
import Text from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

export interface Props {
  className?: string | undefined
  content: React.ReactNode
  type: 'info' | 'error' | 'warning' | 'success'
}

const typeColor = {
  info: undefined,
  error: 'red',
  warning: 'orange',
  success: 'green',
} as const

export const NAME = 'ui-Form-w-Hint'

/**
 * ui-Form-w-Hint
 */
export default function Component(props: Props): JSX.Element | null {
  const { type = 'info' } = props

  return (
    <Text className={c(props.className, NAME)} size='1' color={typeColor[type]}>
      <Flex align='start' gap='1'>
        <Flex as='span' align='center' justify='center'>
          <Icon name='InfoCircled' />
        </Flex>
        {props.content?.toString()}
      </Flex>
    </Text>
  )
}

Component.displayName = NAME
