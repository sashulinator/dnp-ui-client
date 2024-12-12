import React from 'react'
import { Field, type FieldInputProps, type FieldMetaState } from 'react-final-form'

import { type FlexProps } from '~/shared/flex'
import { c } from '~/utils/core'
import type { NestedKeyOf, PathValue } from '~/utils/types/object'

import { NAME as PARENT_NAME } from '../ui.string-field'
import TextField, { type Props as TextFieldProps } from '../ui.string-field'

export const NAME = `${PARENT_NAME}-v-Typed`

export default function Component<
  const Values extends Record<string, unknown>,
  const TName extends NestedKeyOf<Values>,
  const TV extends PathValue<Values, TName> = PathValue<Values, TName>,
>(
  props: Omit<TextFieldProps, 'input' | 'meta'> & {
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
      {({ input, meta }) => <TextField input={input} meta={meta} {...textFieldProps} className={c(className, NAME)} />}
    </Field>
  )
}

Component.displayName = NAME

Component.testValueType = (t: string): string => t
