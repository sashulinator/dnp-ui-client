import { Union } from '@radix-ui/themes/props'

import { type ForwardedRef, forwardRef, useRef } from 'react'

import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

import TextInput, { type TextInputProps } from '../text-input'

export type Props = Omit<TextInputProps, 'value' | 'onChange' | 'type'> & {
  value?: number | undefined
  type?: Union<string, 'number'> | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: number | undefined) => void
  onValueChange?: (value: number | undefined) => void
}

export const NAME = 'textInput-TextInput'

export function Component(props: Props, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { value, ...textInputProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <TextInput
      ref={setRefs(inputRef, forwardedRef)}
      {...textInputProps}
      onChange={(e) => {
        const num = Number(e.target.value)
        const newValue = isNaN(num) ? undefined : num
        props.onChange?.(e, newValue)
        props.onValueChange?.(newValue)
      }}
      value={value?.toString() ?? ''}
      className={c(props.className, NAME)}
    />
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef
