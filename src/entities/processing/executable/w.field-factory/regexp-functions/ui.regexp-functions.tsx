/* eslint-disable react-hooks/rules-of-hooks */
import { Tooltip } from '@radix-ui/themes'

import { useMemo, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import { ListTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import { generateId } from '~/utils/core'

import type { ParamFactoryContext } from '../models'

type Item = {
  id: string
  'base-column': string
  regexp: string
  'type-operation': string
}

export type Props = {
  className?: string | undefined
  value: Item[]
  onChange: (value: Item[]) => void
  _paramContext: ParamFactoryContext
}

const NAME = 'dnp-processing-executable-regexp-functions'

export default function Component(props: Props): JSX.Element | string {
  const { onChange, value, _paramContext } = props

  if (!_paramContext.isSingleMode) {
    return 'Для настройки колонок перейдите во вкладку "Потабличная настройка"'
  }

  return (
    <ScrollArea scrollbars='horizontal'>
      <Flex direction='column'>
        <ListTable.default<Item, Props>
          context={{ _paramContext, onChange, value }}
          columns={initialColumns}
          list={value}
          renderCell={renderCell}
        />
        <Flex mt='2'>
          <Button
            onClick={() =>
              onChange([
                ...value,
                {
                  id: generateId(),
                  'base-column': '',
                  regexp: '',
                  'type-operation': '',
                },
              ])
            }
          >
            <Icon name='Plus' /> Колонка
          </Button>
        </Flex>
      </Flex>
    </ScrollArea>
  )
}

Component.displayName = NAME

export const initialColumns: ListTable.Column<Item, Props>[] = [
  {
    display: 'Тип операции',
    name: 'type-operation',
  },
  {
    display: 'Колонка',
    name: 'base-column',
  },
  {
    display: 'Регулярное выражение',
    name: 'regexp',
  },
  {
    display: '',
    name: 'id',
    getCellProps() {
      return { style: { width: '1px' } }
    },
  },
]

const renderCell = (cellProps: ListTable.RenderCellProps<Item, Props>) => {
  const _paramContext = cellProps?.context?._paramContext
  const onChange = cellProps?.context?.onChange
  const value = cellProps?.context?.value
  const [isTextInput, setIsTextInput] = useState(false)
  const [outputName, setOutputName] = useState(cellProps.item['base-column'] || '')

  const filteredColumns = useMemo(() => {
    if (cellProps.item['type-operation'] === 'column-concat') return _paramContext.columns
    return _paramContext.columns.filter((c) => c.type === 'string')
  }, [_paramContext.columns, cellProps.item['type-operation']])

  const previousColumn = cellProps.list.slice(0, cellProps.rowIndex).reduce<{ name: string }[]>((acc, c) => {
    if (c['base-column']) acc.push({ name: c['base-column'] })
    return acc
  }, [])

  const columnNames = [...new Set([...filteredColumns, ...previousColumn].map((c) => c.name))]

  if (cellProps.name === 'base-column') {
    return (
      <Flex align='end' gap='1'>
        {isTextInput ? (
          <TextInput
            style={{ width: '100%' }}
            onBlur={(e) =>
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, 'base-column': e.target.value }
                  }
                  return r
                }),
              )
            }
            onChange={(e) => setOutputName(e.target.value)}
            size='1'
            value={outputName}
          />
        ) : (
          <InputSelect.default
            clearable={true}
            size='1'
            value={cellProps.item['base-column'] || undefined}
            onChange={(v) => {
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, 'base-column': v.toString() }
                  }
                  return r
                }),
              )
            }}
            variant='surface'
            options={columnNames.map((name) => ({ display: name, value: name }))}
          />
        )}
        <Tooltip
          content={
            isTextInput
              ? outputName
                ? 'Очистите поле ввода чтобы сменить тип ввода на "Выбор из существующих'
                : 'Выбрать из существующих'
              : 'Ввести название вручную'
          }
        >
          <Button
            variant='outline'
            square={true}
            size='1'
            onClick={() => {
              setIsTextInput((s) => !s)
              setOutputName('')
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, 'output-column': '' }
                  }
                  return r
                }),
              )
            }}
          >
            <Icon name={isTextInput ? 'ChevronDown' : 'Pencil'} />
          </Button>
        </Tooltip>
      </Flex>
    )
  }

  if (cellProps.name === 'type-operation') {
    return (
      <InputSelect.default
        clearable={true}
        size='1'
        value={cellProps.item['type-operation'] || undefined}
        onChange={(v) => {
          onChange(
            value.map((r) => {
              if (r.id !== cellProps.item.id) return r
              return {
                ...r,
                'type-operation': v.toString(),
              }
            }),
          )
        }}
        variant='surface'
        options={[
          { display: 'Разделение', value: 'column-split' },
          { display: 'Обьединение', value: 'column-concat' },
        ]}
      />
    )
  }

  if (cellProps.name === 'regexp') {
    return (
      <TextInput
        style={{ width: '100%' }}
        value={cellProps.item.regexp || ''}
        placeholder={`Пример: {{firstname}:{{[А-Я{1}]}}/{{secondname}}:{{[а-я]+}}`}
        size={'1'}
        onChange={(e) => {
          onChange?.(
            value.map((r) => {
              if (r.id === cellProps.item.id) {
                return { ...r, regexp: `${e.target.value}` }
              }
              return r
            }),
          )
        }}
      />
    )
  }

  if (cellProps.name === 'id') {
    return (
      <Button
        size='1'
        variant='soft'
        round={true}
        onClick={() => {
          onChange(value.filter((r) => r.id !== cellProps.item.id))
        }}
      >
        <Icon name='Trash' />
      </Button>
    )
  }
}
