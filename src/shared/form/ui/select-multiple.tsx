import React, { useId } from 'react'
import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import { _checkErrorVisible } from '~/shared/form/lib/_check-error-visible'
import { _renderHint } from '~/shared/form/lib/_render-hint'
import SelectMultiple, { type SelectMultipleProps } from '~/shared/select-multiple'
import { c, fns } from '~/utils/core'

import { NAME as PARENT_NAME } from './form'
import Label from './label'

export const NAME = `${PARENT_NAME}-w-TextField`

export type Props<FieldValue> = Omit<SelectMultipleProps, 'name' | 'value'> & {
  label?: string | undefined | React.ReactElement
  rootProps?: FlexProps | undefined
  input: FieldInputProps<string>
  meta: FieldMetaState<FieldValue>
  renderHint?: (props: {
    input: FieldInputProps<string>
    meta: FieldMetaState<FieldValue>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: { input: FieldInputProps<string>; meta: FieldMetaState<FieldValue> }) => boolean
}

export default function Component<FieldValue>(props: Props<FieldValue>) {
  const {
    input,
    meta,
    className,
    renderHint = _renderHint,
    label,
    rootProps,
    variant = 'soft',
    checkIsErrorVisible = _checkErrorVisible,
    ...textFieldProps
  } = props

  const id = useId()
  const isErrorVisible = checkIsErrorVisible({ input, meta })

  // Форма не может корректно работать с обьектами и массивами
  // поэтому конвертируем в строку и обратно
  const value = JSON.parse(input.value || '[]')

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' width='100%' {...rootProps}>
      <Label children={label} htmlFor={id} />
      <SelectMultiple
        color={isErrorVisible ? 'red' : undefined}
        {...textFieldProps}
        id={id}
        value={value}
        variant={variant}
        onValueChange={(value) => input.onChange(JSON.stringify(value.reverse() || []))}
        onBlur={fns(input.onBlur, textFieldProps.onBlur)}
        onFocus={fns(input.onFocus, textFieldProps.onFocus)}
      />
      {React.createElement(renderHint, { input, meta, isErrorVisible })}
    </Flex>
  )
}

export { type Props as SelectMultipleProps }

Component.displayName = NAME
