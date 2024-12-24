import { type ForwardedRef, forwardRef } from 'react'

import Flex from '~/shared/flex'
import Labeled, { type LabeledProps as SharedLabeledProps } from '~/shared/labeled'
import { c } from '~/utils/core'

import TextInput, { NAME as PARENT_NAME, type Props as TextInputProps } from '../ui.number-input'

export type Props = TextInputProps & {
  className?: string | undefined
  label?: React.ReactNode
  labeldProps?: SharedLabeledProps | undefined
  children?: React.ReactNode
}

const NAME = `${PARENT_NAME}-v-Labeled`

export function Component(props: Props, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { children, label: lable, className, ...textInputProps } = props

  return (
    <Flex width='100%' direction='column' className={c(className, NAME)}>
      <Labeled label={lable}>
        <TextInput {...textInputProps} ref={forwardedRef} className={c(props.className, NAME)} />
      </Labeled>
      {children}
    </Flex>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef

export { type Props as LabeledProps }
