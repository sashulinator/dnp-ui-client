import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import Card from '../ui/card'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string | undefined
  children: React.ReactNode
  loading?: boolean
}

const NAME = 'card-input-inputCard'

export default function Component(props: Props): JSX.Element {
  const { loading, ...buttonProps } = props

  return (
    <Card asChild={true} size='1' className={c(props.className, NAME)}>
      <button {...buttonProps}>
        <Flex align='center'>
          <Flex width='100%'>{props.children}</Flex>
          <Text color='gray'>{loading ? <Spinner /> : <Icon name='ChevronRight' />}</Text>
        </Flex>
      </button>
    </Card>
  )
}

Component.displayName = NAME
