import { memo } from 'react'
import type { FieldInputProps, FieldMetaState } from 'react-final-form'
import { useField } from 'react-final-form'

import { DatabaseTableForm } from '~/shared/database-table'
import Flex from '~/shared/flex'
import type { SelectProps, TextFieldProps } from '~/shared/form'
import { Card, Checkbox, Column, Row, Select, TextField, TypedField, UniqueTextField } from '~/shared/form'
import { c } from '~/utils/core'

import { SYSNAME } from '../../../constants/name'
import type { Values } from '../types/values'

export interface Props {
  className?: string | undefined
  readonly?: boolean
  isKnUniq?: ((kn: string) => Promise<boolean>) | undefined
}

export const NAME = `${SYSNAME}-Form`

/**
 * dictionaryTable-Form
 */
export function Component(props: Props): JSX.Element {
  return (
    <Flex className={c(props.className, NAME)} direction='column' width='100%' gap='6'>
      <Card>
        <Column>
          <Row style={{ width: '100%' }}>
            <TypedField<Values, 'kn', string, string, _KnFieldProps, HTMLInputElement>
              component={_KnField}
              name='kn'
              checkUnique={props.isKnUniq}
              rootProps={{ flexBasis: '25%' }}
              variant='soft'
              label='Системное название'
            />
            <Flex width='75%' />
          </Row>
          <Row style={{ width: '100%' }}>
            <Checkbox variant='soft' name='nav' label='Отображать в навигационной панели' />
          </Row>
        </Column>
      </Card>

      <Card>
        <Row>
          <Column width='25%'>
            <TypedField<Values, 'name', string, string, TextFieldProps<string>, HTMLInputElement>
              component={TextField}
              name='name'
              label='Название'
              variant='soft'
            />
            <TypedField<Values, 'tableSchema.defaultView', string, string, SelectProps<string>, HTMLInputElement>
              component={Select}
              label='Представление по умолчанию'
              name='tableSchema.defaultView'
              defaultValue={'table'}
              options={[
                { value: 'table', display: 'Таблица' },
                { value: 'tree', display: 'Дерево' },
              ]}
            />
          </Column>
          <Flex width='75%' />
        </Row>
      </Card>

      <Card>
        <DatabaseTableForm
          fieldNames={{ table: 'tableName', columns: 'tableSchema.items' }}
          strings={{ table: 'Название таблицы в базе данных', columns: 'Колонки' }}
        />
      </Card>
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
  const { checkUnique, ...textFieldProps } = props

  const createdAtValue = useField<Values>('createdAt', { subscription: { value: true } })
  const readOnly = Boolean(createdAtValue.input.value)

  return <UniqueTextField entityName={SYSNAME} checkUnique={checkUnique} readOnly={readOnly} {...textFieldProps} />
}
