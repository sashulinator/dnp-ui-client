import './ui.input.scss'

import type { ForwardedRef } from 'react'
import { createElement, forwardRef } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

import Base, { type BaseProps } from './base'

export type Props = BaseProps & {
  onClearableClick?: ((e: React.MouseEvent) => void) | undefined
  renderActionIcon?: (() => React.ReactNode) | undefined
  hasValue?: boolean
}

const NAME = 'ui-input'

export function Component(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { children, onClearableClick, hasValue, renderActionIcon = _DefaultActionIcon, ...baseProps } = props

  return (
    <Base
      ref={setRefs(ref)}
      data-disabled={props.disabled === true ? props.disabled : undefined}
      {...baseProps}
      className={c(props.className, NAME)}
    >
      <Flex>{children}</Flex>
      <Flex gap='2' align='center' justify='center' style={{ height: 'fit-content', width: 'fit-content' }}>
        {hasValue && !props.disabled && (
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
      </Flex>
    </Base>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

function _DefaultActionIcon() {
  return <Icon style={{ minHeight: '15px', minWidth: '15px' }} name='ChevronRight' />
}
