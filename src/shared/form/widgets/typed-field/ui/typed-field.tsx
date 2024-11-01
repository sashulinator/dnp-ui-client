import { createElement } from 'react'
import { Field, FieldRenderProps, RenderableProps, UseFieldConfig } from 'react-final-form'

import { Any } from '~/utils/core'
import { NestedKeyOf } from '~/utils/types/object'

export type Props<
  P extends string,
  FieldValue,
  InputValue,
  RP extends FieldRenderProps<FieldValue, T, InputValue> = FieldRenderProps<FieldValue, HTMLElement, InputValue>,
  T extends HTMLElement = HTMLElement,
> = UseFieldConfig<FieldValue, InputValue> &
  RenderableProps<RP> & {
    name: P
  } & Omit<RP, 'input' | 'meta'>

export const NAME = 'ui-Form-w-Field'

/**
 * ui-Form-w-Field
 */
export default function Component<
  FormValues extends Record<string, Any>,
  P extends NestedKeyOf<FormValues>,
  FieldValue,
  InputValue,
  RP extends FieldRenderProps<FieldValue, T, InputValue> = FieldRenderProps<FieldValue, HTMLElement, InputValue>,
  T extends HTMLElement = HTMLElement,
>(props: Props<P, FieldValue, InputValue, RP, T>): JSX.Element {
  return createElement(Field, props as Any)
}

Component.displayName = NAME
