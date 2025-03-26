/* eslint-disable no-console */
import { ScrollArea } from '@radix-ui/themes'

import { useMemo, useState } from 'react'

import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'
import { type Any, type Dictionary } from '~/utils/core'
import { type Atom, createAtom } from '~/utils/store'

import { type Context, generateEmptyValue, toEditableColumn } from '../-list/w.editable'
import MatrixTable, { type ColumnProps, type Option } from './ui.matrix'

type Item = Dictionary
type StoryContext = Context<Item>

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [values, setValues] = useState(initialValues)
    const [columns, setColumns] = useState(initialColumns)

    const columnNameAtoms = useMemo(() => {
      return columns.reduce<Record<string, Atom<string>>>((acc, column) => {
        acc[column.name] = createAtom(column.name)
        return acc
      }, {})
    }, [columns])

    const editableColumns = useMemo(() => {
      return columns.map(toEditableColumn)
    }, [columns])

    return (
      <div style={{ padding: '2rem', width: '1024px' }}>
        <ScrollArea scrollbars='horizontal'>
          <Flex>
            <MatrixTable<Dictionary, StoryContext, Any>
              {...state}
              context={{
                columnNameAtoms,
                removeColumn: (columnName) => {
                  setColumns((s) => s.filter((c) => c.name !== columnName))
                },
              }}
              columns={editableColumns as Any}
              options={options}
              values={values}
              onValuesChange={setValues}
              renderOptionHeader={() => (
                <Text color='red' weight='regular'>
                  Твой кастом
                </Text>
              )}
              renderOptionCell={(props) => props.option.display}
              renderCell={(props) => (
                <Checkbox
                  checked={Boolean(props.value)}
                  onCheckedChange={(checked) => {
                    props.onValueChange(!!checked)
                  }}
                />
              )}
            />
            <Flex>
              <Button
                onClick={() =>
                  setColumns((s) => [...s, { name: generateEmptyValue(), display: 'new', type: 'string' }])
                }
              >
                <Icon name='Plus' /> Колонка
              </Button>
            </Flex>
          </Flex>
        </ScrollArea>
      </div>
    )
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => MatrixTable.displayName,
} satisfies Story<State>

export const initialColumns = [
  {
    name: 'firstName',
    display: 'firstName',
    type: 'string',
  },
  {
    name: 'secondName',
    display: 'firstName',
    type: 'string',
  },
  {
    name: 'age',
    display: 'firstName',
    type: 'number',
  },
  {
    name: 'sex',
    display: 'firstName',
    type: 'string',
  },
] satisfies ColumnProps<Dictionary, Dictionary, boolean>[]

export const options = [
  {
    display: 'Процент значений',
    value: 'row-1',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Кол-во строк',
    value: 'row-2',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Количество дубликатов',
    value: 'row-3',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Макс',
    value: 'row-4',
    columnTypes: ['string'],
  },
  {
    display: 'Мин',
    value: 'row-5',
    columnTypes: ['string'],
  },
  {
    display: 'Медиана',
    value: 'row-6',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Сумма',
    value: 'row-7',
    columnTypes: ['number'],
  },
] satisfies Option[]

export const initialValues = {
  [initialColumns[0].name]: { [options[0].value]: true },
  [initialColumns[1].name]: { [options[1].value]: true },
  [initialColumns[2].name]: { [options[1].value]: true },
  [initialColumns[3].name]: { [options[2].value]: true },
}
