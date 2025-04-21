/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useMemo, useState } from 'react'

import Button from '~/shared/button'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Multiselect, { Picker } from '~/shared/multiselect'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import { ListTable } from '~/shared/table'
import Text from '~/shared/text'
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

const NAME = 'processing-ScalarFunctions'

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
  type FunctionMeta = { name: string; types: string[] }
  const [outputName, setOutputName] = useState(cellProps.item['output-column'] || '')
  const functions = cellProps.item['functions'] || []

  const [isFunctionDialogPickerOpen, setFunctionDialogPickerOpen] = useState(false)

  const [isTextInput, setIsTextInput] = useState(false)

  const _paramContext = cellProps?.context?._paramContext
  const componentProps = _paramContext.paramSchema?.component?.props
  const onChange = cellProps?.context?.onChange
  const value = cellProps?.context?.value

  const functionMetaList = (componentProps as { functions: FunctionMeta[] })?.functions || []
  const functionTypes = [...new Set(functionMetaList.flatMap((f) => f.types))]

  const possibleColumns = _paramContext.columns.filter((c) => functionTypes.includes(c.type || ''))
  const inputColumnMeta = _paramContext.columns.find((c) => c.name === cellProps.item['input-column'])
  const thisTypeFunctionMetaList = useMemo(
    () => functionMetaList.filter((fm) => fm.types?.includes(inputColumnMeta?.type || '')),
    [cellProps.item['input-column']],
  )

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
                    return { ...r, 'output-name': e.target.value }
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
            value={cellProps.item['output-column'] || undefined}
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

  if (cellProps.name === 'input-column') {
    return (
      <InputSelect.default
        clearable={true}
        size='1'
        value={cellProps.item['input-column'] || undefined}
        onChange={(v) => {
          onChange(
            value.map((r) => {
              if (r.id !== cellProps.item.id) return r
              return {
                ...r,
                'input-column': v.toString(),
                // скидываем functions если изменили входную колонку
                functions: [],
              }
            }),
          )
        }}
        variant='surface'
        options={possibleColumns.map((c) => ({ display: c.name, value: c.name }))}
      />
    )
  }

  if (cellProps.name === 'functions') {
    return (
      <Flex gap='1'>
        <Multiselect.Root
          onValueChange={(v) => {
            onChange(
              value.map((r) => {
                if (r.id === cellProps.item.id) {
                  return { ...r, functions: v }
                }
                return r
              }),
            )
          }}
          value={functions || []}
        >
          <Dialog.Root open={isFunctionDialogPickerOpen} onOpenChange={(open) => setFunctionDialogPickerOpen(open)}>
            <Dialog.Trigger>
              <Multiselect.Trigger
                size='1'
                variant='outline'
                disabled={!cellProps.item['input-column']}
                strings={{ selected: 'Выбрано' }}
                // prettier-ignore
                renderActionIcon={useCallback(() => <Icon name='ChevronRight' />, [])}
              />
            </Dialog.Trigger>
            <Dialog.Content minWidth='1000px'>
              <Picker.Root
                value={functions || []}
                options={thisTypeFunctionMetaList?.map((fm) => ({
                  value: fm.name,
                  display: fm.name,
                }))}
                onValueChange={(v) => {
                  onChange(
                    value.map((r) => {
                      if (r.id === cellProps.item.id) {
                        return { ...r, functions: v }
                      }
                      return r
                    }),
                  )
                }}
              >
                <Flex width='100%' gap='4'>
                  <Flex direction='column' width='50%'>
                    <Text size='3' mb='4'>
                      Функции
                    </Text>
                    <Picker.OptionList width='100%' />
                  </Flex>
                  <Flex direction='column' width='50%'>
                    <Text size='3' mb='4'>
                      Выбрано ({functions.length})
                    </Text>
                    <Picker.ValueList width='100%' />
                  </Flex>
                </Flex>
              </Picker.Root>
            </Dialog.Content>
          </Dialog.Root>
        </Multiselect.Root>
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
