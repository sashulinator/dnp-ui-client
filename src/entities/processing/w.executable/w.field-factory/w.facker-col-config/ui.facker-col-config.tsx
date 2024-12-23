import { useMemo, useState } from 'react'

import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { MatrixTable } from '~/shared/table'
import { type Context, generateEmptyValue, toEditableColumn } from '~/shared/table/v.list/w.editable'
import TextInput from '~/shared/text-input'
import type { Any, Dictionary } from '~/utils/core'
import { type Atom, createAtom } from '~/utils/store'

type Item = Dictionary
type StoryContext = Context<Item>

export interface Props {
  className?: string | undefined
}

const NAME = 'processing-FackerColConfig'

export default function Component(): JSX.Element {
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
    <ScrollArea scrollbars='horizontal'>
      <Flex>
        <MatrixTable.default<Dictionary, StoryContext, Any>
          context={{
            columnNameAtoms,
            removeColumn: () => {
              // setColumns((s) => s.filter((c) => c.name !== columnName))
            },
          }}
          columns={editableColumns as Any}
          options={options}
          values={values}
          onValuesChange={setValues}
          renderOptionCell={(props) => props.option.display}
          renderCell={(props) => {
            if (props.item['Ыカ'] === 'sem') {
              return <TextInput variant='soft' size='1' value={props.value as string} />
            }
            if (props.item['Ыカ'] === 'dict') {
              return <TextInput variant='soft' size='1' value={props.value as string} />
            }
            if (props.item['Ыカ'] === 'type') {
              return <TextInput variant='soft' size='1' value={props.value as string} />
            }

            return (
              <Checkbox
                checked={Boolean(props.value)}
                onCheckedChange={(checked) => {
                  props.onValueChange(!!checked)
                }}
              />
            )
          }}
        />
        <Flex>
          <Button
            onClick={() => setColumns((s) => [...s, { name: generateEmptyValue(), display: 'new', type: 'string' }])}
          >
            <Icon name='Plus' /> Колонка
          </Button>
        </Flex>
      </Flex>
    </ScrollArea>
  )
}

Component.displayName = NAME

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
] satisfies MatrixTable.ColumnProps<Dictionary, Dictionary, boolean>[]

export const options = [
  {
    display: 'Семантический тип',
    value: 'sem',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Словарь',
    value: 'dict',
    columnTypes: ['string', 'number'],
  },
  {
    display: 'Тип',
    value: 'type',
    columnTypes: ['string', 'number'],
  },
] satisfies MatrixTable.Option[]

export const initialValues = {
  [initialColumns[0].name]: { [options[0].value]: 'person.name' },
  [initialColumns[1].name]: { [options[0].value]: 'person.secondName' },
  [initialColumns[2].name]: { [options[0].value]: 'person.age' },
  [initialColumns[3].name]: { [options[0].value]: 'person.sex' },

  [initialColumns[3].name]: { [options[1].value]: 'sex' },
}
