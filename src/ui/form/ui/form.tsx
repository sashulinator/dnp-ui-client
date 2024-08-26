import { type AnyObject, type Config, type FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { Form, type FormRenderProps, type RenderableProps } from 'react-final-form'

import { Any } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export type Props<
  FormValues = Record<string, Any>,
  InitialFormValues = Partial<FormValues>,
  T extends Record<string, Any> = AnyObject,
> = Omit<Config<FormValues, InitialFormValues>, 'onSubmit'> &
  RenderableProps<T & FormRenderProps<FormValues, InitialFormValues>> & {
    form: FormApi<FormValues, InitialFormValues>
  } & T

export const NAME = 'ui-Form'

/**
 * ui-Form
 */
export default function Component<
  FormValues = Record<string, Any>,
  InitialFormValues = Partial<FormValues>,
  T extends Record<string, Any> = AnyObject,
>(props: Props<FormValues, InitialFormValues, T>): JSX.Element {
  const { ...formProps } = props

  props.form.setConfig('mutators', { ...arrayMutators })

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Form
      {...formProps}
      // Заглушка, onSubmit должен быть передан в props.form.onSubmit
      onSubmit={emptyFn}
    />
  )
}

Component.displayName = NAME
