import { type FieldValidator } from 'final-form'
import { createElement } from 'react'
import { Field, type FieldProps, type FieldRenderProps } from 'react-final-form'

import type { Any } from '~/utils/core'

export interface Props<
  FieldValue,
  RP extends FieldRenderProps<FieldValue, T, InputValue>,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue,
> extends FieldProps<FieldValue, RP, T, InputValue> {}

const displayName = 'ui-Form-w-Field'

/**
 * ui-Form-w-Field
 */
export default function Component<
  FieldValue,
  RP extends FieldRenderProps<FieldValue, T, InputValue> = Any,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue,
>(props: Props<FieldValue, RP, T, InputValue>): JSX.Element {
  const { validate, ...fieldProps } = props

  const validator: FieldValidator<FieldValue> = (...args) => {
    try {
      return validate?.(...args)
    } catch (e) {
      return e
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return createElement(Field, { validate: validator, ...fieldProps })
}

Component.displayName = displayName
