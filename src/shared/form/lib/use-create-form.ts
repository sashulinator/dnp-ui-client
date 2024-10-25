import { Config, FormApi, FormSubscription, createForm } from 'final-form'
import { useEffect, useMemo } from 'react'

import { Any, fns } from '~dnp/utils/core'
import { useForceUpdate } from '~dnp/utils/core-hooks'
import { useCurrent } from '~dnp/utils/core-hooks/current'

export function useCreateForm<FormValues = Record<string, Any>, InitialFormValues = Partial<FormValues>>(
  config: Config<FormValues>,
  subscription: FormSubscription = {},
): FormApi<FormValues, InitialFormValues> {
  const update = useForceUpdate()

  const onSubmitRef = useCurrent(config.onSubmit)
  const validateRef = useCurrent(config.validate)

  const form = useMemo(
    () =>
      createForm<FormValues, InitialFormValues>({
        ...config,
        // Делаем так чтобы функции были всегда актуальными
        // иначе все замкнутые внутри них переменные будут с неактуальными данными
        onSubmit: (...a) => onSubmitRef.current?.(...a),
        validate: (...a) => validateRef.current?.(...a),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(subscribe, [])

  // при вызове функции form.initialize происходит сброс подисок
  // поэтому переподписываемся
  const _initialize = form.initialize
  form.initialize = fns(_initialize, subscribe)

  return form

  function subscribe() {
    form.subscribe(update, subscription)
  }
}
