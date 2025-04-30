import { type Procedure } from '~/entities/processing'
import { notify } from '~/shared/notification-list-store'
import { parseSafe } from '~/utils/json'

import Content from './content'
import { useWrapper } from './use-wrapper'

const NAME = 'page-getProcedureById-wrapper'

export default function Component(): JSX.Element {
  const { updateProcedureMutator, form, procedureState } = useWrapper()

  return (
    <Content
      form={{ form }}
      editor={{
        language: 'json',
        options: {
          tabIndex: 2,
          wordBreak: 'normal',
          wordWrap: 'on',
        },
      }}
      procedureState={procedureState}
      saveButton={{
        onClick() {
          const parsed = parseSafe<Procedure.Procedure>(procedureState.get())
          if (parsed) updateProcedureMutator.mutate({ input: parsed })
          else notify({ type: 'error', title: 'Невалидное значение' })
        },
      }}
      formatButton={{
        onClick() {
          const parsed = parseSafe(procedureState.get())
          if (parsed) procedureState.set(JSON.stringify(parsed, null, 2))
        },
      }}
    />
  )
}

Component.displayName = NAME
