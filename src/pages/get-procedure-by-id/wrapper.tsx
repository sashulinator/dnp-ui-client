import { parseSafe } from '~/utils/json'

import Content from './content'
import { useWrapper } from './use-wrapper'

const NAME = 'page-getProcedureById-wrapper'

export default function Component(): JSX.Element {
  const { form } = useWrapper()

  return (
    <Content
      editor={{
        language: 'json',
        options: {
          tabIndex: 2,
          autoIndent: 'none',
          wordBreak: 'normal',
          wordWrap: 'on',
        },
      }}
      form={{ form }}
      saveButton={{ onClick: form.submit }}
      formatButton={{
        onClick() {
          const parsed = parseSafe(form.getState()?.values.input as any)
          if (parsed) form.getFieldState('input')?.change(JSON.stringify(parsed, null, 2))
        },
      }}
    />
  )
}

Component.displayName = NAME
