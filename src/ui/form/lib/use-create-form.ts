import { Config, FormApi, FormSubscription, createForm } from 'final-form'
import { useMemo } from 'react'

import { Any } from '~/utils/core'
import { useForceUpdate, useUpdate } from '~/utils/core-hooks'
import { useCurrent } from '~/utils/core-hooks/current'

export function useCreateForm<FormValues = Record<string, Any>, InitialFormValues = Partial<FormValues>>(
  config: Config<FormValues>,
  subscription: FormSubscription = {},
): FormApi<FormValues, InitialFormValues> {
  const update = useForceUpdate()

  const onSubmitRef = useCurrent(config.onSubmit)
  config.onSubmit = (...args) => onSubmitRef.current?.(...args)

  const form = useMemo(() => createForm<FormValues, InitialFormValues>(config), [])

  const origInitialize = form.initialize
  form.initialize = _initialize

  useUpdate((update) => form.subscribe(update, subscription), [form.getState().initialValues])

  return form

  function _initialize(values: Any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    origInitialize(values)
    update()
  }
}
