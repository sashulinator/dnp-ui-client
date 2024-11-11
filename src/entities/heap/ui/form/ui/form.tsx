import { Flex } from '@radix-ui/themes'

import { JsonEditor } from '~/shared/code-editor'
import { useForm } from '~/shared/form'
import { c } from '~/utils/core'

import { NAME as SLICE } from '../../../constants/name'

export const NAME = `${SLICE}-Form`

/**
 * Heap-Form
 */

export interface Props {
  className?: string | undefined
}

export default function Component(props: Props): JSX.Element {
  const form = useForm()

  const handleJsonChange = (newJson: string) => {
    form.change('data', JSON.parse(newJson))
  }

  return (
    <Flex className={c(props.className, NAME)} direction='column' width='100%' gap='6'>
      {form.getState()?.values.data && (
        <JsonEditor
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            enableMobileMenu: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          value={JSON.stringify(form.getState()?.values.data, null, 2)}
          onChange={handleJsonChange}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
        />
      )}
    </Flex>
  )
}

Component.displayName = NAME
