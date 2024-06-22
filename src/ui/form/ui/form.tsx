import { type FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { Form, type FormProps } from 'react-final-form'

import { Any } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export interface Props<FormValues = Record<string, Any>, InitialFormValues = Partial<FormValues>>
  extends Omit<FormProps<FormValues, InitialFormValues>, 'onSubmit'> {
  className?: string | undefined
  form: FormApi<FormValues, InitialFormValues>
}

const displayName = 'ui-Form'

/**
 * ui-Form
 */
export default function Component<FormValues = Record<string, Any>, InitialFormValues = Partial<FormValues>>(
  props: Props<FormValues, InitialFormValues>,
): JSX.Element {
  const { ...formProps } = props

  props.form.setConfig('mutators', { ...arrayMutators })

  return (
    <Form
      {...formProps}
      // Заглушка, onSubmit должен быть передан в props.form.onSubmit
      onSubmit={emptyFn}
    />
  )
}

Component.displayName = displayName
