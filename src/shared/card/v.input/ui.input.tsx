import { Card } from '@radix-ui/themes'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import { c, fns } from '~/utils/core'
import { stopPropagation } from '~/utils/core-client'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string | undefined
  children: React.ReactNode
  disabled?: boolean | undefined
  loading?: boolean | undefined
  clearable?: boolean | undefined
  onClearableClick?: ((e: React.MouseEvent) => void) | undefined
}

const NAME = 'card-input-inputCard'

export default function Component(props: Props): JSX.Element {
  const { loading, clearable, onClearableClick, ...buttonProps } = props

  return (
    <Card
      style={{
        padding: 'var(--space-1) var(--space-1)',
        opacity: buttonProps.disabled ? '0.5' : '1',
        pointerEvents: buttonProps.disabled ? 'none' : undefined,
      }}
      asChild={true}
      size='1'
      variant='surface'
      className={c(props.className, NAME)}
    >
      <Flex role='button' {...(buttonProps as any)}>
        <Flex align='center'>
          <Flex width='100%'>{props.children}</Flex>
          <Flex gap='2' align='center'>
            {clearable && (
              <Button round={true} size={'1'} variant='ghost' onClick={fns(onClearableClick, stopPropagation)}>
                <Icon name='Cross1' />
              </Button>
            )}
            <Text color='gray'>
              {loading ? (
                <Spinner style={{ opacity: buttonProps.disabled ? '0.5' : '1' }} />
              ) : (
                <Icon style={{ opacity: buttonProps.disabled ? '0.5' : '1' }} name='ChevronRight' />
              )}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

Component.displayName = NAME
