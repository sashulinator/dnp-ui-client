import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import { ListTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import { generateId } from '~/utils/core'

import type { ParamFactoryContext } from './models'

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

const NAME = 'regexp-functions'

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
    display: 'Основная колонка',
    name: 'base-column',
  },
  {
    display: 'Регулярное выражение',
    name: 'regexp',
  },
]

const renderCell = (cellProps: ListTable.RenderCellProps<Item, Props>) => {
  const _paramContext = cellProps?.context?._paramContext
  const onChange = cellProps?.context?.onChange
  const value = cellProps?.context?.value

  const possibleColumns = _paramContext.columns.filter((c) => c.type === 'string')

  if (cellProps.name === 'base-column') {
    return (
      <Flex align='end' gap='1'>
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
          options={possibleColumns.map((c) => ({ display: c.name, value: c.name }))}
        />
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
    const displayValue = cellProps.item.regexp.replace(/^"""(.*)"""$/, '$1')
    return (
      <Flex width={'100%'} gap='4'>
        <Flex width={'100%'}>
          <TextInput
            style={{ width: '100%' }}
            value={displayValue || ''}
            placeholder={`Пример: {{firstname}:{{[А-Я{1}]}}/{{secondname}}:{{[а-я]+}}`}
            size={'1'}
            onChange={(e) => {
              onChange?.(
                value.map((r) => {
                  if (r.id === cellProps.item.id) {
                    return { ...r, regexp: `"""${e.target.value}"""` }
                  }
                  return r
                }),
              )
            }}
          />
        </Flex>
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
