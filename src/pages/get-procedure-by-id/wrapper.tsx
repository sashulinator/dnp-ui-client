import Content from './content'
import { useWrapper } from './use-wrapper'

const NAME = 'page-getProcedureById-wrapper'

export default function Component(): JSX.Element {
  const { form } = useWrapper()

  return (
    <Content
      editor={{
        language: 'json',
      }}
      form={{ form }}
      saveButton={{ onClick: form.submit }}
    />
  )
}

Component.displayName = NAME
