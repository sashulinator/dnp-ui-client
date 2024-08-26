import React, { useState } from 'react'
import { Values } from '../../../types/values'
import Button from '~/ui/button'
import Card from '~/ui/card'
import DataList from '~/ui/data-list'
import Flex from '~/ui/flex'
import {
  Field,
  Label,
  Select,
  TypedField,
  TextField,
  useForm,
  FieldArray,
  getIn,
  TextFieldProps,
  SelectProps,
} from '~/ui/form'
import Icon from '~/ui/icon'
import Separator from '~/ui/separator'
import Text from '~/ui/text'
import { c, generateUniqId, isDev } from '~/utils/core'
import { NonNullableFlat } from '~/utils/types/object/non-nullable'

type Item = {
  id: string
  key: string
  name: string
  type: string
  relation?: {
    table: string
    key: string
  }
}

export interface Props {
  className?: string | undefined
  name: string
}

export const NAME = 'operationalTable-Form-w-Columns'

const FLEX_BASIS = 'calc(25% - 6px)'

/**
 * operationalTable-Form-w-Columns'
 */
export default function Component(props: Props): JSX.Element {
  const { name } = props

  return (
    <Flex width='100%' wrap='wrap' gap='2'>
      <FieldArray<Item> name={name} className={c(props.className, NAME)}>
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) =>
                React.createElement(_renderColumn, {
                  key: name,
                  name,
                  index,
                  move: fields.move,
                  remove: fields.remove,
                  length: fields.length || 0,
                }),
              )}
              <Button
                type='button'
                onClick={() =>
                  fields.push({
                    id: generateUniqId(3, (id) => !fields.value.find((item) => item.id === id)),
                    key: '',
                    name: '',
                    type: 'string',
                  })
                }
                variant='outline'
                asChild
                style={{
                  display: 'flex',
                  height: '14.5rem',
                  order: fields.length,
                  flexBasis: FLEX_BASIS,
                }}
              >
                <Flex align='center' justify='center'>
                  <Icon name='Plus' style={{ scale: '3' }} />
                </Flex>
              </Button>
            </>
          )
        }}
      </FieldArray>
    </Flex>
  )
}

Component.displayName = NAME

interface _renderColumnProps {
  name: string
  index: number
  remove: (index: number) => void
  move: (from: number, to: number) => void
  length: number
}

function _renderColumn(props: _renderColumnProps) {
  const { name, index, move, remove, length } = props
  const typedName = name as unknown as number
  const form = useForm()
  const value = getIn(form.getState().values, `${name}.relation`)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasRelation, setHasRelation] = useState(Boolean(value))

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: FLEX_BASIS,
        order: index,
        transition: 'flex 0.3s',
      }}
    >
      <Flex direction='column' gap='4'>
        <Flex gap='2' width='100%' justify='end' align='center'>
          {isDev() && (
            <Field<string, TextFieldProps<string>, HTMLInputElement> name={`${name}.id`}>
              {({ input }) => {
                return (
                  <Text color='gray' size='1'>
                    {input.value}
                  </Text>
                )
              }}
            </Field>
          )}
          <Button disabled={index === 0} onClick={() => move(index, index - 1)} size='1' variant='outline' round={true}>
            <Icon name='ArrowLeft' />
          </Button>
          <Text color='gray' size='1'>
            {index}
          </Text>
          <Button
            disabled={index === (length || 0) - 1}
            onClick={() => move(index, index + 1)}
            size='1'
            variant='outline'
            round={true}
          >
            <Icon name='ArrowRight' />
          </Button>
          <Separator orientation='vertical' />
          <Button onClick={() => remove(index)} variant='outline' color='red' round={true}>
            <Icon name='Trash' />
          </Button>
        </Flex>
        <DataList.Root size='2'>
          <DataList.Item>
            <Label content='Колонка' />
            <DataList.Value>
              <TypedField<
                Values['tableSchema']['items'],
                `${number}.columnName`,
                string,
                string,
                TextFieldProps<string>,
                HTMLInputElement
              >
                component={TextField}
                size='1'
                variant='soft'
                name={`${typedName}.columnName`}
              />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <Label content='Название' />
            <DataList.Value>
              <TypedField<
                Values['tableSchema']['items'],
                `${number}.name`,
                string,
                string,
                TextFieldProps<string>,
                HTMLInputElement
              >
                component={TextField}
                size='1'
                variant='soft'
                name={`${typedName}.name`}
              />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <Label content='Тип' />
            <DataList.Value>
              <TypedField<
                Values['tableSchema']['items'],
                `${number}.type`,
                string,
                string,
                SelectProps<string>,
                HTMLInputElement
              >
                component={Select}
                size='1'
                name={`${typedName}.type`}
                defaultValue='string'
                options={[
                  { value: 'string', display: 'Строка' },
                  { value: 'number', display: 'Число' },
                  { value: 'float', display: 'Нецелочисленное' },
                  { value: 'date', display: 'Дата' },
                  { value: 'boolean', display: 'Да/Heт' },
                ]}
              />
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Card>
          <DataList.Root size='2'>
            <DataList.Item>
              <Text size='1' color='gray'>
                Связь
              </Text>
              <DataList.Value>
                <Flex width='100%' justify='end'>
                  <Button
                    onClick={() => setHasRelation(!hasRelation)}
                    size='1'
                    variant='outline'
                    round={true}
                    type='button'
                  >
                    <Icon name={hasRelation ? 'ChevronUp' : 'ChevronDown'} />
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            {hasRelation && (
              <>
                <DataList.Item>
                  <Label content='Таблица' />
                  <DataList.Value>
                    <TypedField<
                      Required<NonNullableFlat<Values['tableSchema']['items'][number]>>[],
                      `${number}.relation.tableName`,
                      string,
                      string,
                      TextFieldProps<string>,
                      HTMLInputElement
                    >
                      component={TextField}
                      size='1'
                      variant='soft'
                      name={`${typedName}.relation.tableName`}
                    />
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <Label content='Колонка' />
                  <DataList.Value>
                    <TypedField<
                      Required<NonNullableFlat<Values['tableSchema']['items'][number]>>[],
                      `${number}.relation.columnName`,
                      string,
                      string,
                      TextFieldProps<string>,
                      HTMLInputElement
                    >
                      component={TextField}
                      size='1'
                      variant='soft'
                      name={`${typedName}.relation.columnName`}
                    />
                  </DataList.Value>
                </DataList.Item>
              </>
            )}
          </DataList.Root>
        </Card>
      </Flex>
    </Card>
  )
}
