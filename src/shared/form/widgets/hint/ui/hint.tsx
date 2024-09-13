import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import { c } from '~/utils/core'

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
      <Flex align='center' gap='1'>
        <Icon name='InfoCircled' />
        {props.content?.toString()}
      </Flex>
    </Text>
  )
}

Component.displayName = NAME
