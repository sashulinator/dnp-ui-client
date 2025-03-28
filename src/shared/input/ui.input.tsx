import './input.scss'

import { createElement } from 'react'

import type { ButtonProps } from '~/shared/button'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { c } from '~/utils/core'

export type Props = Omit<ButtonProps, 'variant' | 'size' | 'value'> & {
  hasValue?: boolean
  variant?: 'soft' | 'outline' | undefined
  size?: '1' | '2' | '3' | '4' | null | undefined
  onClearableClick?: ((e: React.MouseEvent) => void) | undefined
  renderActionIcon?: (() => React.ReactNode) | undefined
}

const NAME = 'ui-input'

export default function Component(props: Props): JSX.Element {
  const {
    children,
    onClearableClick,
    hasValue,
    variant = 'outline',
    size = '2',
    renderActionIcon = _DefaultActionIcon,
    ...buttonProps
  } = props

  return (
    <button
      {...buttonProps}
      data-disabled={props.disabled === true ? props.disabled : undefined}
      className={c(
        props.className,
        NAME,
        'rt-reset ui-BaseInput ui-Input',
        `--variant--${variant}`,
        size && `--size--${size}`,
      )}
    >
      <Flex width='100%'>{children}</Flex>
      <Flex gap='2' height={'24px'} width='24px' align='center' justify='center'>
        <>
          {hasValue && (
            <Button
              asChild={true}
              round={true}
              size={'1'}
              variant='ghost'
              onClick={(e) => {
                e.stopPropagation()
                onClearableClick?.(e)
              }}
            >
              {/** кнопка не может быть внутри кнопки поэтому делаем ссылкой */}
              <a role='button'>
                <Icon name='Cross1' />
              </a>
            </Button>
          )}
          {createElement(renderActionIcon)}
        </>
      </Flex>
    </button>
  )
}

Component.displayName = NAME

function _DefaultActionIcon() {
  return <Icon style={{ minHeight: '15px', minWidth: '15px' }} name='ChevronRight' />
}
