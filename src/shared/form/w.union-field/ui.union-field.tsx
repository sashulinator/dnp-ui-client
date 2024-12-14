import React from 'react'
import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import { _checkErrorVisible } from '~/shared/form/lib/_check-error-visible'
import { _renderHint } from '~/shared/form/lib/_render-hint'
import { LabeledSelect } from '~/shared/select'
import { type Any, c, fns } from '~/utils/core'

import { NAME as PARENT_NAME } from '../ui/form'

export const NAME = `${PARENT_NAME}-w-UnionField`

export type Props = Omit<LabeledSelect.LabeledProps, 'name' | 'value'> & {
  label?: string | undefined | React.ReactElement
  rootProps?: FlexProps | undefined
  input: FieldInputProps<string, Any>
  meta: FieldMetaState<string>
  renderHint?: (props: {
    input: FieldInputProps<string, Any>
    meta: FieldMetaState<string>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: { input: FieldInputProps<string, Any>; meta: FieldMetaState<string> }) => boolean
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
    ...selectProps
  } = props

  const isErrorVisible = checkIsErrorVisible({ input, meta })

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' width='100%' {...rootProps}>
      <LabeledSelect.default
        color={isErrorVisible ? 'red' : undefined}
        {...selectProps}
        variant={variant}
        value={input.value}
        // @ts-ignore
        onChange={fns(selectProps.onChange, input.onChange)}
        onBlur={fns(selectProps.onBlur, input.onBlur)}
        onFocus={fns(selectProps.onFocus, input.onFocus)}
      >
        {React.createElement(renderHint as Any, { input, meta, isErrorVisible })}
      </LabeledSelect.default>
    </Flex>
  )
}

Component.displayName = NAME
