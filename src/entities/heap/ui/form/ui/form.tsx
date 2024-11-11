import { Flex } from '@radix-ui/themes'

import { JsonEditor } from '~/shared/form'
import { c } from '~/utils/core'

import { NAME as SLICE } from '../../../constants/name'
import { type Heap } from '../../../models'

export const NAME = `${SLICE}-Form`

export type Values = {
  name: string
  description: string
  data: string
}

/**
 * Heap-Form
 */

export interface Props {
  className?: string | undefined
}

export default function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, NAME)} direction='column' width='100%' gap='6'>
      <JsonEditor
        label='data'
        name='data'
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          enableMobileMenu: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
      />
    </Flex>
  )
}

Component.displayName = NAME

/**
 * static
 */

Component.toFormValues = (heap: Heap): Values => {
  return { ...heap, data: JSON.stringify(heap.data, null, 2) }
}
Component.fromFormValues = (values: Values): Heap => {
  return { ...values, data: JSON.parse(values.data) }
}
