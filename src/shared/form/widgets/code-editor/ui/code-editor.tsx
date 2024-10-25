import { Field } from 'react-final-form'

import CodeEditor, { type CodeEditorProps } from '~dnp/shared/code-editor'
import Flex from '~dnp/shared/flex'
import Text from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

export interface Props extends CodeEditorProps {
  className?: string | undefined
  name: string
  label: string
}

const displayName = 'ui-Form-w-CodeEditor'

/**
 * ui-Form-w-CodeEditor
 */
export default function Component(props: Props): JSX.Element {
  const { name, label, ...codeEditorProps } = props

  return (
    <Field<string> name={name}>
      {({ input }) => {
        return (
          <Text as='label' className={c(props.className, displayName)}>
            <Flex direction={'column'} gap='1'>
              {label}
              <CodeEditor {...codeEditorProps} {...input} />
            </Flex>
          </Text>
        )
      }}
    </Field>
  )
}

Component.displayName = displayName
