import { memo } from 'react'
import { FieldInputProps, FieldMetaState, useField } from 'react-final-form'

import Flex from '~/ui/flex'
import {
  Card,
  Checkbox,
  Column,
  Label,
  Row,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  TypedField,
  UniqueTextField,
} from '~/ui/form'
import { c } from '~/utils/core'
import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../../constants/name'
import { Values } from '../types/values'
import Columns from '../widgets/columns'

export interface Props {
  className?: string | undefined
  readonly?: boolean
  isKnUniq?: ((kn: string) => Promise<boolean>) | undefined
}

export const NAME = `${uncapitalize(unspace(ENTITY_NAME))}-Form`

/**
 * operationalTable-Form
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
        <Column>
          <Row>
            <Column width='25%'>
              <TypedField<Values, 'tableName', string, string, TextFieldProps<string>, HTMLInputElement>
                component={TextField}
                name='tableName'
                label='Таблица'
                variant='soft'
              />
            </Column>
            <Flex width='75%' />
          </Row>
          <Column>
            <Flex direction='column'>
              <Label content='Колонки' />
              <Columns name='tableSchema.items' />
            </Flex>
          </Column>
        </Column>
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

  return <UniqueTextField entityName={ENTITY_NAME} checkUnique={checkUnique} readOnly={readOnly} {...textFieldProps} />
}
