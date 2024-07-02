import { Field } from 'react-final-form'
import CodeEditor, { type CodeEditorProps } from '~/ui/code-editor'
import Flex from '~/ui/flex'
import Text from '~/ui/text'
import { c } from '~/utils/core'

export interface Props extends CodeEditorProps {
  className?: string | undefined
  name: string
  label: string
}

const displayName = 'ui-Form-w-JsonEditor'

/**
 * ui-Form-w-CodeEditor
 */
export default function Component(props: Props): JSX.Element {
  const { name, label, ...codeEditorProps } = props

  return (
    <Field<string> name={name} validate={validate}>
      {({ input, meta }) => {
        return (
          <Text as='label' style={{ width: '100%' }} className={c(props.className, displayName)}>
            <Flex direction={'column'} gap='1' width='100%'>
              {label}
              <CodeEditor {...codeEditorProps} {...input} />
              {(meta.error || meta.submitError) && meta.dirty && (
                <Text color='red'>{meta.error?.message || meta.submitError.message}</Text>
              )}
            </Flex>
          </Text>
        )
      }}
    </Field>
  )

  function validate(v: string) {
    try {
      JSON.parse(v)
    } catch (err) {
      return err
    }
  }
}

Component.displayName = displayName
