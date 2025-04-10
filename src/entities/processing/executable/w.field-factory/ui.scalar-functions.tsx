/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import SelectMultiple from '~/shared/select-multiple'
import { ListTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import Tooltip from '~/shared/tooltip'
import { generateId } from '~/utils/core'

import type { ParamFactoryContext } from './models'

type Item = {
  id: string
  'input-column': string
  'output-column': string | undefined
  functions: string[]
}

export type Props = {
  className?: string | undefined
  value: Item[]
  onChange: (value: Item[]) => void
  _paramContext: ParamFactoryContext
}

const NAME = 'processing-FackerColConfig'

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
                  'input-column': '',
                  'output-column': undefined,
                  functions: [],
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
    display: 'Колонка',
    name: 'input-column',
  },
  {
    display: 'Выходная колонка',
    name: 'output-column',
  },
  {
    display: 'Функции',
    name: 'functions',
  },
]

const renderCell = (cellProps: ListTable.RenderCellProps<Item, Props>) => {
  const [outputName, setOutputName] = useState(cellProps.item['output-column'] || '')
  const [functions, setFunctions] = useState(cellProps.item['functions'])
  const [isTextInput, setIsTextInput] = useState(false)

  const _paramContext = cellProps?.context?._paramContext
  const componentProps = _paramContext.paramSchema?.component?.props
  const onChange = cellProps?.context?.onChange
  const value = cellProps?.context?.value

  if (cellProps.name === 'output-column') {
    return (
      <Flex align='end' gap='1'>
        {isTextInput ? (
          <TextInput
            style={{ width: '100%' }}
            onBlur={(e) =>
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, 'column-name': e.target.value }
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
            value={cellProps.item['output-column']}
            onChange={(v) => {
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, 'output-column': v.toString() }
                  }
                  return r
                }),
              )
            }}
            variant='surface'
            options={_paramContext.columns.map((c) => ({ display: c.name, value: c.name }))}
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
          <Button variant='outline' square={true} size='1' onClick={() => setIsTextInput((s) => !s)}>
            <Icon name={isTextInput ? 'ChevronDown' : 'Pencil'} />
          </Button>
        </Tooltip>
      </Flex>
    )
  }

  if (cellProps.name === 'input-column') {
    return (
      <InputSelect.default
        clearable={true}
        size='1'
        value={cellProps.item['input-column']}
        onChange={(v) => {
          onChange(
            value.map((r) => {
              if (r.id === cellProps.item.id) {
                return { ...r, 'input-column': v.toString() }
              }
              return r
            }),
          )
        }}
        variant='surface'
        options={_paramContext.columns.map((c) => ({ display: c.name, value: c.name }))}
      />
    )
  }

  if (cellProps.name === 'functions') {
    const functionOptions = (componentProps as { functionOptions: string[] })?.functionOptions || []

    return (
      <Flex gap='1'>
        <SelectMultiple
          style={{ width: '100%' }}
          value={functions}
          variant='surface'
          options={functionOptions.map((name) => ({
            value: name,
            display: name,
          }))}
          size='1'
          onBlur={() => {
            setTimeout(() => {
              onChange(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, functions }
                  }
                  return r
                }),
              )
            })
          }}
          onValueChange={(v) => {
            setFunctions(v)
          }}
        />
        <Flex align='center'>
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
        </Flex>
      </Flex>
    )
  }
}
