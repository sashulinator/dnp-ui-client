import React from 'react'
import { Field, type FieldInputProps, type FieldMetaState } from 'react-final-form'

import { type FlexProps } from '~/shared/flex'
import { c } from '~/utils/core'
import type { NestedKeyOf, PathValue } from '~/utils/types/object'

import { NAME as PARENT_NAME } from '../ui.union-field'
import UnionField, { type Props as UnionFieldProps } from '../ui.union-field'

export const NAME = `${PARENT_NAME}-v-Typed`

// ЭТОТ ТИП НЕ ИСПОЛЬЗУЕТСЯ В КОМПОНЕНТЕ
// так как невозможно передать Values и TName в виду их сложности
export type Props<
  Values extends Record<string, unknown>,
  TName extends NestedKeyOf<Values>,
  TV extends PathValue<Values, TName> = PathValue<Values, TName>,
> = Omit<UnionFieldProps, 'input' | 'meta'> & {
  rootProps?: FlexProps | undefined
  name: TName
  testValueType: (t: TV) => string
  renderHint?: (props: {
    input: FieldInputProps<TV, HTMLInputElement>
    meta: FieldMetaState<TV>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: { input: FieldInputProps<TV, HTMLInputElement>; meta: FieldMetaState<TV> }) => boolean
}

export default function Component<
  const Values extends Record<string, unknown>,
  const TName extends NestedKeyOf<Values>,
  const TV extends PathValue<Values, TName> = PathValue<Values, TName>,
>(
  props: Omit<UnionFieldProps, 'input' | 'meta'> & {
    rootProps?: FlexProps | undefined
    name: TName
    testValueType: (t: TV) => string
    renderHint?: (props: {
      input: FieldInputProps<TV, HTMLInputElement>
      meta: FieldMetaState<TV>
      isErrorVisible: boolean
    }) => React.ReactNode
    checkIsErrorVisible?: (props: { input: FieldInputProps<TV, HTMLInputElement>; meta: FieldMetaState<TV> }) => boolean
  },
) {
  const {
    name,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    testValueType,
    ...textFieldProps
  } = props

  return (
    <Field name={name}>
      {({ input, meta }) => <UnionField input={input} meta={meta} {...textFieldProps} className={c(className, NAME)} />}
    </Field>
  )
}

Component.displayName = NAME

Component.testValueType = (t: string): string => t
