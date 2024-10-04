import { useEffect, useState } from 'react'
import { useField } from 'react-final-form'

import Button from '~/shared/button'
import Card from '~/shared/card'
import SharedCheckbox from '~/shared/checkbox'
import DataList from '~/shared/data-list'
import Flex from '~/shared/flex'
import type { SelectProps, TextFieldProps } from '~/shared/form'
import { Checkbox, Field, Label, Select, TextField, TypedField, getIn, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import Separator from '~/shared/separator'
import Text from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { isDev } from '~/utils/core'
import type { NonNullableFlat } from '~/utils/types/object/non-nullable'

import type { Column } from '../../../models/database-table'

export const NAME = 'databaseTable-ColumnForm'

export interface Props {
  name: string
  index: number
  remove: (index: number) => void
  move: (from: number, to: number) => void
  length: number
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

export default function Component(props: Props) {
  const { name, index, move, remove, length, rootProps } = props

  // Кастим к пустой строке чтобы ниже TypedField не ругался
  const typedName = `${name}.` as ''
  const form = useForm()
  const relationValue = getIn(form.getState().values, `${name}.relation`)

  const [hasRelation, setHasRelation] = useState(Boolean(relationValue))

  return (
    <Card asChild={true} {...rootProps}>
      <Flex>
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
            <Button
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              size='1'
              variant='outline'
              round={true}
            >
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
              <Label>
                <Flex gap={'1'}>
                  Название
                  <Tooltip content={'Отображение в интерфейсе'}>
                    <span>
                      <Icon name={'InfoCircled'} />
                    </span>
                  </Tooltip>
                </Flex>
              </Label>
              <DataList.Value>
                <TypedField<Column, 'name', string, string, TextFieldProps<string>, HTMLInputElement>
                  component={TextField}
                  size='1'
                  variant='soft'
                  name={`${typedName}name`}
                />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <Label>
                <Flex gap={'1'}>
                  Тех. название
                  <Tooltip content={'В базе данных'}>
                    <span>
                      <Icon name={'InfoCircled'} />
                    </span>
                  </Tooltip>
                </Flex>
              </Label>
              <DataList.Value>
                <TypedField<Column, 'columnName', string, string, TextFieldProps<string>, HTMLInputElement>
                  component={TextField}
                  size='1'
                  variant='soft'
                  name={`${typedName}columnName`}
                />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <Label>Обязательно</Label>
              <DataList.Value>
                <Checkbox checked defaultChecked={true} size='1' name={`${typedName}nullable`} />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <Label>Связь</Label>
              <DataList.Value>
                <SharedCheckbox checked={hasRelation} size='1' onCheckedChange={(v) => setHasRelation(!!v)} />
              </DataList.Value>
            </DataList.Item>
            {hasRelation ? (
              <>
                <DataList.Item>
                  <Label children='Ссылка' />
                  <DataList.Value>
                    <TypedField<
                      Required<NonNullableFlat<Column>>,
                      'relation.kn',
                      string,
                      string,
                      TextFieldProps<string>,
                      HTMLInputElement
                    >
                      component={TextField}
                      size='1'
                      variant='soft'
                      name={`${typedName}relation.kn`}
                    />
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <Label children='Колонка' />
                  <DataList.Value>
                    <TypedField<
                      Required<NonNullableFlat<Column>>,
                      'relation.columnName',
                      string,
                      string,
                      TextFieldProps<string>,
                      HTMLInputElement
                    >
                      component={TextField}
                      size='1'
                      variant='soft'
                      name={`${typedName}relation.columnName`}
                    />
                  </DataList.Value>
                </DataList.Item>
              </>
            ) : (
              <>
                <DataList.Item>
                  <Label children='Тип' />
                  <DataList.Value>
                    <TypedField<Column, 'type', string, string, SelectProps<string>, HTMLInputElement>
                      component={Select}
                      size='1'
                      name={`${typedName}type`}
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
                <DataList.Item>
                  <Label>
                    <Flex gap={'1'}>
                      Индексация
                      <Tooltip
                        content={
                          <>
                            Индексировать для быстрого поиска
                            <br />
                            (увеличивает размер на жестком диске)
                          </>
                        }
                      >
                        <span>
                          <Icon name={'InfoCircled'} />
                        </span>
                      </Tooltip>
                    </Flex>
                  </Label>
                  <DataList.Value>
                    <Checkbox size='1' name={`${typedName}index`} />
                  </DataList.Value>
                </DataList.Item>
                <_IsNegativeAllowedListItem typedName={typedName} />
                <_DecimalPlacesDataListItem typedName={typedName} />
              </>
            )}
          </DataList.Root>
        </Flex>
      </Flex>
    </Card>
  )
}

Component.displayName = NAME

/**
 * _MaxLengthDataListItem
 */

type _MaxLengthDataListItemProps = {
  typedName: ''
}

function _MaxLengthDataListItem(props: _MaxLengthDataListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}type`, { subscription: { value: true } })
  if (typeValue.input.value === 'date' || typeValue.input.value === 'boolean') {
    return null
  }

  return (
    <DataList.Item>
      <Label children='Длина' />
      <DataList.Value>
        <Field<string, TextFieldProps<string>, HTMLInputElement>
          component={TextField}
          size='1'
          variant='soft'
          parse={(value) => {
            if (!value) {
              return undefined as unknown as string
            }
            return parseInt(value) as unknown as string
          }}
          name={`${typedName}maxLength`}
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
  typedName: ''
}

function _IsNegativeAllowedListItem(props: _IsNegativeAllowedListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}type`, { subscription: { value: true } })

  const form = useForm()

  const hidden =
    typeValue.input.value === 'boolean' || typeValue.input.value === 'date' || typeValue.input.value === 'string'

  useEffect(() => {
    if (hidden) {
      form.change(`${typedName}isNegativeAllowed`, undefined)
    } else {
      form.change(`${typedName}isNegativeAllowed`, form.getFieldState(`${typedName}isNegativeAllowed`)?.value || false)
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
        <Checkbox checked defaultChecked={true} size='1' name={`${typedName}isNegativeAllowed`} />
      </DataList.Value>
    </DataList.Item>
  )
}

/**
 * _DecimalPlacesDataListItem
 */

type _DecimalPlacesDataListItemProps = {
  typedName: ''
}

function _DecimalPlacesDataListItem(props: _DecimalPlacesDataListItemProps) {
  const { typedName } = props

  const typeValue = useField(`${typedName}type`, { subscription: { value: true } })
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
            component={TextField}
            size='1'
            variant='soft'
            name={`${typedName}decimalPlaces`}
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
