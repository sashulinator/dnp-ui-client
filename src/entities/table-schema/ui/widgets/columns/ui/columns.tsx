import React, { useEffect, useState } from 'react'
import { useField } from 'react-final-form'

import Button from '~/shared/button'
import Card from '~/shared/card'
import DataList from '~/shared/data-list'
import Flex from '~/shared/flex'
import type { SelectProps, TextFieldProps } from '~/shared/form'
import { Checkbox, Field, FieldArray, Label, Select, TextField, TypedField, getIn, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import Separator from '~/shared/separator'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { c, generateUniqId, isDev } from '~/utils/core'
import type { NonNullableFlat } from '~/utils/types/object/non-nullable'

import type { Values } from '../../../types/values'

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

export const NAME = 'dictionaryTable-Form-w-Columns'

const FLEX_BASIS = 'calc(25% - 6px)'

/**
 * dictionaryTable-Form-w-Columns'
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
  const relationValue = getIn(form.getState().values, `${name}.relation`)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasRelation, setHasRelation] = useState(Boolean(relationValue))

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
                  { value: 'integer', display: 'Целое число' },
                  { value: 'float', display: 'Дробное число' },
                  { value: 'date', display: 'Дата' },
                  { value: 'boolean', display: 'Да/Heт' },
                  { value: 'byte', display: 'Целое число (byte)' },
                  { value: 'short', display: 'Целое число (short)' },
                  { value: 'long', display: 'Целое число (long)' },
                  { value: 'double', display: 'Дробное число (double)' },
                ]}
              />
            </DataList.Value>
          </DataList.Item>
          <_MaxLengthDataListItem typedName={typedName} />
          <_DecimalPlacesDataListItem typedName={typedName} />
          <_IsNegativeAllowedListItem typedName={typedName} />
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
                      `${number}.relation.kn`,
                      string,
                      string,
                      TextFieldProps<string>,
                      HTMLInputElement
                    >
                      component={TextField}
                      size='1'
                      variant='soft'
                      name={`${typedName}.relation.kn`}
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

/**
 * Private
 */

/**
 * _MaxLengthDataListItem
 */

type _MaxLengthDataListItemProps = {
  typedName: number
}

function _MaxLengthDataListItem(props: _MaxLengthDataListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}.type`, { subscription: { value: true } })
  if (typeValue.input.value === 'date' || typeValue.input.value === 'boolean') {
    return null
  }

  return (
    <DataList.Item>
      <Label content='Длина' />
      <DataList.Value>
        <Field<string, TextFieldProps<string>, HTMLInputElement>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          component={TextField}
          size='1'
          variant='soft'
          parse={(value) => {
            if (!value) {
              return undefined as unknown as string
            }
            return parseInt(value) as unknown as string
          }}
          name={`${typedName}.maxLength`}
          type='number'
        />
      </DataList.Value>
    </DataList.Item>
  )
}

/**
 * _IsNegativeAllowedListItem
 */
type _IsNegativeAllowedListItemProps = {
  typedName: number
}

function _IsNegativeAllowedListItem(props: _IsNegativeAllowedListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}.type`, { subscription: { value: true } })

  const form = useForm()

  const hidden =
    typeValue.input.value === 'boolean' || typeValue.input.value === 'date' || typeValue.input.value === 'string'

  useEffect(() => {
    if (hidden) {
      form.change(`${typedName}.isNegativeAllowed`, undefined)
    } else {
      form.change(
        `${typedName}.isNegativeAllowed`,
        form.getFieldState(`${typedName}.isNegativeAllowed`)?.value || false,
      )
    }
  }, [hidden])

  if (hidden) {
    return null
  }

  return (
    <DataList.Item>
      <Label>
        <Flex gap={'1'}>
          Отрицательное
          <Tooltip content={'Возможность ввода отрицательных значений'}>
            <span>
              <Icon name={'InfoCircled'} />
            </span>
          </Tooltip>
        </Flex>
      </Label>
      <DataList.Value>
        <Checkbox checked defaultChecked={true} size='1' name={`${typedName}.isNegativeAllowed`} />
      </DataList.Value>
    </DataList.Item>
  )
}

/**
 * _DecimalPlacesDataListItem
 */

type _DecimalPlacesDataListItemProps = {
  typedName: number
}

function _DecimalPlacesDataListItem(props: _DecimalPlacesDataListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}.type`, { subscription: { value: true } })
  if (typeValue.input.value === 'float' || typeValue.input.value === 'double') {
    return (
      <DataList.Item>
        <Label>
          <Flex gap={'1'}>
            Точность
            <Tooltip content={'Количество знаков после запятой'}>
              <span>
                <Icon name={'InfoCircled'} />
              </span>
            </Tooltip>
          </Flex>
        </Label>

        <DataList.Value>
          <Field<string, TextFieldProps<string>, HTMLInputElement>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            component={TextField}
            size='1'
            variant='soft'
            name={`${typedName}.decimalPlaces`}
            parse={(value) => {
              if (!value) {
                return undefined as unknown as string
              }
              return parseInt(value) as unknown as string
            }}
            type='number'
          />
        </DataList.Value>
      </DataList.Item>
    )
  }
  return null
}
