import React, { useId } from 'react'
import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import { _checkErrorVisible } from '~/shared/form/lib/_check-error-visible'
import { _renderHint } from '~/shared/form/lib/_render-hint'
import TextField, { type RootProps } from '~/shared/text-field'
import { c, fns } from '~/utils/core'

import { NAME as PARENT_NAME } from '../../form'
import Label from '../../label/ui/label'

export const NAME = `${PARENT_NAME}-w-TextField`

export type Props<FieldValue> = Omit<RootProps, 'name' | 'value'> & {
  label?: string | undefined | React.ReactElement
  rootProps?: FlexProps | undefined
  input: FieldInputProps<string, HTMLInputElement>
  meta: FieldMetaState<FieldValue>
  renderHint?: (props: {
    input: FieldInputProps<string, HTMLInputElement>
    meta: FieldMetaState<FieldValue>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: {
    input: FieldInputProps<string, HTMLInputElement>
    meta: FieldMetaState<FieldValue>
  }) => boolean
}

export default function Component<FieldValue>(props: Props<FieldValue>) {
  const {
    input,
    meta,
    className,
    renderHint = _renderHint,
    label,
    rootProps,
    checkIsErrorVisible = _checkErrorVisible,
    variant = 'soft',
    ...textFieldProps
  } = props

  const id = useId()
  const isErrorVisible = checkIsErrorVisible({ input, meta })

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' width='100%' {...rootProps}>
      <Label children={label} htmlFor={id} />
      <TextField.Root
        color={isErrorVisible ? 'red' : undefined}
        {...textFieldProps}
        id={id}
        variant={variant}
        value={input.value}
        type={input.type as 'text'}
        onChange={fns(input.onChange, textFieldProps.onChange)}
        onBlur={fns(input.onBlur, textFieldProps.onBlur)}
        onFocus={fns(input.onFocus, textFieldProps.onFocus)}
      />
      {React.createElement(renderHint, { input, meta, isErrorVisible })}
    </Flex>
  )
}

Component.displayName = NAME
