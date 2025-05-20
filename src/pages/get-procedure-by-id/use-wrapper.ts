import { useParams } from 'react-router-dom'

import { Procedure } from '~/entities/processing'
import { type FormApi, useCreateForm } from '~/shared/form'
import { type Atom, useAtom } from '~/utils/store'
import { notifyError, notifySuccess } from '~notification'

export type Result = {
  id: string
  procedureFetcher: Procedure.api.getById.QueryResult
  updateProcedureMutator: Procedure.api.update.UseMutationResult
  procedureState: Atom<string>
  form: FormApi
}

export function useWrapper(): Result {
  const { id = '' } = useParams()

  const procedureFetcher = Procedure.api.getById.useCache(
    { id },
    {
      onSuccess(data) {
        procedureState.set(JSON.stringify(data, null, 2))
      },
    },
  )

  const updateProcedureMutator = Procedure.api.update.useMutation({
    onSuccess() {
      notifySuccess({ type: 'success', title: 'Успешно' })
    },
    onError() {
      notifyError({ type: 'error', title: 'Неизвестная ошибка' })
    },
  })

  const form = useCreateForm<any>(
    {
      onSubmit(values) {
        // eslint-disable-next-line no-console
        console.log(values)
      },
      // initialValues: { query: 'kkkklklklklklk' },
    },
    {
      values: false,
    },
  )

  const procedureState = useAtom<string>('')

  return { id, procedureFetcher, updateProcedureMutator, procedureState, form }
}
