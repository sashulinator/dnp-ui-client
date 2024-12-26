import { useEffect, useState } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import { type Option } from '~/shared/select/v.input'
import { ListTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import { type Dictionary, generateId } from '~/utils/core'

import { type ParamSchema } from '../../models'
import type { ParamFactoryContext } from '../models'

type Item = {
  id: string
  'column-name': string
  'semantic-name': string
  dict: string
  'col-type': string
}
type StoryContext = Dictionary

export interface Props {
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
        <ListTable.default<Item, StoryContext>
          context={{}}
          columns={initialColumns}
          list={value}
          renderCell={(cellProps) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [state, setState] = useState(cellProps.value as string)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => setState(cellProps.value as string), [cellProps.value])

            const params = (_paramContext.paramSchema as any)?.component?.props?.params as ParamSchema[]

            if (cellProps.name === 'col-type') {
              const param = params?.find((p) => p.name === 'type')
              const options = (param?.component?.props as { options: Option[] })?.options
              return (
                <Flex gap='2'>
                  <InputSelect.default
                    style={{ width: '100%' }}
                    options={options}
                    variant='surface'
                    size='1'
                    value={state}
                    onChange={(v) => {
                      onChange(
                        value.map((r) => {
                          if (r.id === cellProps.item.id) {
                            return { ...r, 'col-type': v.toString() }
                          }
                          return r
                        }),
                      )
                    }}
                  />
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
              )
            }
            if (cellProps.name === 'semantic-name') {
              const param = params?.find((p) => p.name === 'semtype')
              const options = (param?.component?.props as { options: Option[] })?.options
              return (
                <InputSelect.default
                  style={{ width: '100%' }}
                  value={state}
                  options={options}
                  variant='surface'
                  size='1'
                  onChange={(v) => {
                    onChange(
                      value.map((r) => {
                        if (r.id === cellProps.item.id) {
                          return { ...r, 'semantic-name': v.toString() }
                        }
                        return r
                      }),
                    )
                  }}
                />
              )
            }
            if (cellProps.name === 'dict') {
              return (
                <TextInput
                  disabled={true}
                  onBlur={(e) =>
                    onChange(
                      value.map((r) => {
                        if (r['column-name'] === cellProps.item['column-name']) {
                          return { ...r, dict: e.target.value }
                        }
                        return r
                      }),
                    )
                  }
                  onChange={(e) => setState(e.target.value)}
                  size='1'
                  value={state}
                />
              )
            }

            if (cellProps.name === 'column-name') {
              return (
                <TextInput
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
                  onChange={(e) => setState(e.target.value)}
                  size='1'
                  value={state}
                />
              )
            }
          }}
        />
        <Flex mt='2'>
          <Button
            onClick={() =>
              onChange([
                ...value,
                { id: generateId(), 'column-name': '', dict: '', 'semantic-name': '', 'col-type': '' },
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

export const initialColumns = [
  {
    display: 'Название колонки',
    name: 'column-name',
  },
  {
    display: 'Семантический тип',
    name: 'semantic-name',
  },
  {
    display: 'Словарь',
    name: 'dict',
  },
  {
    display: 'Тип',
    name: 'col-type',
  },
] satisfies ListTable.ColumnProps<Item, StoryContext>[]
