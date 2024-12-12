import { type ForwardedRef, forwardRef, useRef } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import TextField, { type RootProps, type SlotProps } from '~/shared/text-field'
import { c } from '~/utils/core'
import { setInputValue } from '~/utils/dom-event'
import { setRefs } from '~/utils/react'

export type Props = RootProps & {
  className?: string | undefined
  left?: React.ReactNode | undefined
  right?: React.ReactNode | undefined
  leftProps?: SlotProps | undefined
  rightProps?: SlotProps | undefined
  clearable?: boolean | undefined
}

export const NAME = 'textInput-TextInput'

export function Component(props: Props, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { clearable, left, right, leftProps, rightProps, ...textInputProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <TextField.Root ref={setRefs(inputRef, forwardedRef)} {...textInputProps} className={c(props.className, NAME)}>
      {left && (
        <TextField.Slot side='left' {...leftProps}>
          {left}
        </TextField.Slot>
      )}
      {clearable && (
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
