import React from 'react'
import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import { _checkErrorVisible } from '~/shared/form/lib/_check-error-visible'
import { _renderHint } from '~/shared/form/lib/_render-hint'
import { LabeledTextInput, type LabeledTextInputProps } from '~/shared/number-input'
import { type Any, c, fns } from '~/utils/core'

import { NAME as PARENT_NAME } from '../ui/form'

export const NAME = `${PARENT_NAME}-w-StringField`

export type Props = Omit<LabeledTextInputProps, 'name' | 'value'> & {
  label?: string | undefined | React.ReactElement
  rootProps?: FlexProps | undefined
  input: FieldInputProps<number, HTMLInputElement>
  meta: FieldMetaState<number>
  renderHint?: (props: {
    input: FieldInputProps<number, HTMLInputElement>
    meta: FieldMetaState<number>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: {
    input: FieldInputProps<number, HTMLInputElement>
    meta: FieldMetaState<number>
  }) => boolean
}

export default function Component(props: Props) {
  const {
    input,
    meta,
    className,
    renderHint = _renderHint,
    rootProps,
    checkIsErrorVisible = _checkErrorVisible,
    variant = 'soft',
    ...textFieldProps
  } = props

  const isErrorVisible = checkIsErrorVisible({ input, meta })

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' width='100%' {...rootProps}>
      <LabeledTextInput
        color={isErrorVisible ? 'red' : undefined}
        {...textFieldProps}
        variant={variant}
        value={input.value}
        type={input.type as 'text'}
        onChange={fns(textFieldProps.onChange, input.onChange)}
        onBlur={fns(textFieldProps.onBlur, input.onBlur)}
        onFocus={fns(textFieldProps.onFocus, input.onFocus)}
      >
        {React.createElement(renderHint as Any, { input, meta, isErrorVisible })}
      </LabeledTextInput>
    </Flex>
  )
}

Component.displayName = NAME
