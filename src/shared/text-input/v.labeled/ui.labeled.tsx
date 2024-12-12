import { type ForwardedRef, forwardRef } from 'react'

import Flex from '~/shared/flex'
import Labled, { type LabledProps as SharedLabledProps } from '~/shared/labled'
import { c } from '~/utils/core'

import TextInput, { NAME as PARENT_NAME, type TextInputProps } from '../ui.text-input'

export type Props = TextInputProps & {
  className?: string | undefined
  label?: React.ReactNode
  labeldProps?: SharedLabledProps | undefined
  children?: React.ReactNode
}

const NAME = `${PARENT_NAME}-v-Labled`

export function Component(props: Props, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { children, label: lable, className, ...textInputProps } = props

  return (
    <Flex width='100%' direction='column' className={c(className, NAME)}>
      <Labled lable={lable}>
        <TextInput {...textInputProps} ref={forwardedRef} className={c(props.className, NAME)} />
      </Labled>
      {children}
    </Flex>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

export { type Props as LabeledProps }
