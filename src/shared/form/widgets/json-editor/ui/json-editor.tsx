import { Field } from 'react-final-form'

import { JsonEditor, type JsonEditorProps } from '~/shared/code-editor'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { c } from '~/utils/core'

export interface Props extends JsonEditorProps {
  className?: string | undefined
  name: string
  label: string
}

const displayName = 'ui-Form-w-JsonEditor'

/**
 * ui-Form-w-CodeEditor
 */
export default function Component(props: Props): JSX.Element {
  const { name, label, ...jsonEditorProps } = props

  return (
    <Field<string> name={name} validate={validate}>
      {({ input, meta }) => {
        return (
          <Text as='label' size='2' style={{ width: '100%' }} className={c(props.className, displayName)}>
            <Flex direction={'column'} gap='1' width='100%'>
              {label}
              <JsonEditor
                {...jsonEditorProps}
                {...input}
                setOptions={{
                  maxLines: Infinity,
                  minLines: 4,
                }}
              />
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
