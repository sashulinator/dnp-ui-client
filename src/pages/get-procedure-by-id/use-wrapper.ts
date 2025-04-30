import { useParams } from 'react-router-dom'

import { Procedure } from '~/entities/processing'
import { type FormApi, useCreateForm } from '~/shared/form'
import { notify } from '~/shared/notification-list-store'

export type Result = {
  id: string
  procedureFetcher: Procedure.api.getById.QueryResult
  form: FormApi
}

export function useWrapper(): Result {
  const { id = '' } = useParams()

  const procedureFetcher = Procedure.api.getById.useCache(
    { id },
    {
      onSuccess(data) {
        form.initialize({ input: JSON.stringify(data, null, 2) })
      },
    },
  )

  const updateProcedureMutator = Procedure.api.update.useMutation({
    onSuccess() {
      notify({ type: 'success', title: 'Успешно' })
    },
    onError() {
      notify({ type: 'error', title: 'Неизвестная ошибка' })
    },
  })

  const form = useCreateForm({
    // eslint-disable-next-line no-console
    onSubmit(values) {
      updateProcedureMutator.mutate({ input: JSON.parse(values.input) })
    },
  })

  return { id, procedureFetcher, form }
}
