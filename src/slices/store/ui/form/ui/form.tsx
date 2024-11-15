import { Flex } from '@radix-ui/themes'

import { JsonEditor } from '~/shared/form'
import { c } from '~/utils/core'

import { NAME as SLICE } from '../../../constants/name'
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
      <JsonEditor label='data' name='data' />
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
