import { Flex } from '@radix-ui/themes'

import { Field } from '~/shared/form'
import Editor from '~/slices/monaco-editor'
import { c } from '~/utils/core'

import { SLICE } from '../../../constants/name'
import { type Store } from '../../../models'

export const NAME = `${SLICE}-Form`

export type Values = {
  name: string
  description: string
  data: string
}

/**
 * Store-Form
 */

export interface Props {
  className?: string | undefined
}

export default function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, NAME)} direction='column' width='100%' gap='6'>
      <Field.default<Values['data']> name='data'>{({ input }) => <Editor language='json' {...input} />}</Field.default>
    </Flex>
  )
}

Component.displayName = NAME

/**
 * static
 */

Component.toFormValues = (store: Store): Values => {
  return { ...store, data: JSON.stringify(store.data, null, 2) }
}
Component.fromFormValues = (values: Values): Store => {
  return { ...values, data: JSON.parse(values.data) }
}
