import { memo } from 'react'
import Flex from '~/ui/flex'

import { Section } from '@radix-ui/themes'
import { Values } from '../types/values'
import { Checkbox, JsonEditor, TextField, useForm } from '~/ui/form'
import { assertNotEmpty } from '~/utils/assertions'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const displayName = 'operationalTable-Form'

/**
 * operationalTable-Form
 */
export function Component(props: Props): JSX.Element {
  const form = useForm<Values, Values>()
  const state = form.getState()
  const { readonly = false } = props

  const isCreated = Boolean(state.values.createdAt)

  return (
    <Flex className={c(props.className, displayName)} direction='column' width='100%' gap='4'>
      <Section size='1'>
        <Flex direction='column' gap='4'>
          <Flex style={{ width: '100%' }} gap='4'>
            <Flex flexGrow='2'>
              <TextField name='name' label='Название' validate={assertNotEmpty} />
            </Flex>
            <Flex flexGrow='2'>
              <TextField
                readOnly={readonly}
                disabled={isCreated}
                name='kn'
                label='Системное название'
                validate={assertNotEmpty}
              />
            </Flex>
          </Flex>
          <Checkbox name='nav' label='Отображать в навигационной панеле' />
        </Flex>
      </Section>
      <Section size='1'>
        <Flex gap='4' direction='column'>
          <TextField name='tableName' label='Название таблицы' validate={assertNotEmpty} />
          <JsonEditor readOnly={readonly} name='tableSchema' label='Схема таблицы' />
        </Flex>
      </Section>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = displayName
export default Memoed
