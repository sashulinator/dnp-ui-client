import { memo, useEffect } from 'react'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'
import { useField, useForm } from 'react-final-form'

import Flex from '~/shared/flex'
import type { SelectProps, TextFieldProps } from '~/shared/form'
import { Card, Checkbox, Column, Row, Select, TextField, TypedField } from '~/shared/form'
import { DatabaseTableForm } from '~/slices/database'
import { c, generateId } from '~/utils/core'

import { SYSNAME } from '../../../constants/name'
import type { Values } from '../types/values'

export interface Props {
  className?: string | undefined
  readonly?: boolean
}

export const NAME = `${SYSNAME}-Form`

/**
 * targetTable-Form
 */
export function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, NAME)} direction='column' width='100%' gap='6'>
      <Card>
        <Row style={{ width: '100%' }}>
          <Column>
            <Checkbox variant='soft' name='nav' label='Отображать в навигационной панели' />
            <TypedField<Values, 'defaultView', string, string, SelectProps<string>, HTMLInputElement>
              component={Select}
              label='Представление по умолчанию'
              name='defaultView'
              defaultValue={'table'}
              options={[
                { value: 'table', display: 'Таблица' },
                { value: 'tree', display: 'Дерево' },
              ]}
            />
          </Column>
        </Row>
      </Card>

      <Card>
        <DatabaseTableForm
          primaryRequired={true}
          fieldNames={{
            table: 'name',
            columns: 'columns',
            tableDisplay: 'display',
            description: 'description',
          }}
          strings={{
            table: 'Тех. название',
            columns: 'Колонки',
            tableDisplay: 'Название',
            description: 'Описание',
          }}
        />
      </Card>

      <Flex display='none'>
        <TypedField<Values, 'kn', string, string, _KnFieldProps, HTMLInputElement>
          component={_KnField}
          name='kn'
          rootProps={{ flexBasis: '25%' }}
          variant='soft'
          label='Системное название'
        />
      </Flex>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = NAME
export default Memoed

/**
 * Private
 */

type _KnFieldProps = Omit<TextFieldProps<string>, 'name' | 'value' | 'type'> & {
  input: FieldInputProps<string, HTMLInputElement>
  meta: FieldMetaState<string>
  checkUnique?: ((kn: string) => Promise<boolean>) | undefined
}

function _KnField(props: _KnFieldProps) {
  const { ...textFieldProps } = props

  const createdAtField = useField<Values>('createdAt', { subscription: { value: true } })
  const tableNameField = useField<Values>('name', { subscription: { value: true } })
  const form = useForm()
  const readOnly = Boolean(createdAtField.input.value)

  useEffect(() => {
    if (readOnly) return
    form.change('kn', `${tableNameField.input.value}-${generateId(3)}`)
  }, [tableNameField.input.value])

  return <TextField readOnly={readOnly} {...textFieldProps} />
}
