import { TextField } from '@radix-ui/themes'

import { type ForwardedRef, forwardRef, useRef } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { c, fns } from '~/utils/core'
import { setInputValue } from '~/utils/dom-event'
import { setRefs } from '~/utils/react'

export type Props = Omit<TextField.RootProps, 'value'> & {
  className?: string | undefined
  left?: React.ReactNode | undefined
  right?: React.ReactNode | undefined
  leftProps?: TextField.SlotProps | undefined
  rightProps?: TextField.SlotProps | undefined
  clearable?: boolean | undefined
  value?: string | undefined
  onValueChange?: ((value: string | undefined) => void) | undefined
}

export const NAME = 'textInput-TextInput'

export function Component(props: Props, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { clearable, left, right, leftProps, rightProps, onValueChange, onChange, ...textInputProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = textInputProps.value !== undefined && textInputProps.value !== ''

  return (
    <TextField.Root
      ref={setRefs(inputRef, forwardedRef)}
      {...textInputProps}
      value={textInputProps.value || ''}
      onChange={fns(onChange, (e) => onValueChange?.(e.target.value))}
      className={c(props.className, NAME)}
    >
      {left && (
        <TextField.Slot side='left' {...leftProps}>
          {left}
        </TextField.Slot>
      )}
      {clearable && hasValue && !textInputProps.disabled && (
        <TextField.Slot side='right' {...rightProps}>
          <Flex asChild={true} mr={right ? '0' : '1'}>
            <Button
              round={true}
              size={'1'}
              variant='ghost'
              onClick={() => {
                setInputValue(inputRef.current, '')
                inputRef.current?.focus()
              }}
            >
              <Icon name='Cross1' />
            </Button>
          </Flex>
        </TextField.Slot>
      )}
      {right && (
        <TextField.Slot side='right' {...rightProps}>
          {right}
        </TextField.Slot>
      )}
    </TextField.Root>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

export { type Props as TextInputProps }
