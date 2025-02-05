/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

import { Dcservice, Dctable } from '~/entities/database-container'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import ScrollArea from '~/shared/scroll-area'
import { InputSelect } from '~/shared/select'
import { type Option } from '~/shared/select/v.input'
import { ListTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import Tooltip from '~/shared/tooltip'
import { assertDefined } from '~/utils/assertions'
import { type Dictionary, generateId } from '~/utils/core'

import { type ParamSchema } from '../../models'
import type { ParamFactoryContext } from '../models'

type ColumnLocator = {
  database?: string | undefined
  schema?: string | undefined
  table?: string | undefined
  column?: string | undefined
  url?: string | undefined
}

type Item = {
  id: string
  'column-name': string
  'semantic-name': string
  'column-locator': ColumnLocator
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

const ref: Dictionary<{
  tableLocator: Dctable.DctableMeta
  isTextInput: boolean
}> & { services?: Dcservice.Dcservice[] } = {}

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
            const id = cellProps.item.id
            const refState = ref[id]
            const refTableLocator = refState?.tableLocator
            const refisTextInput = refState?.isTextInput

            const [columnName, setColumnName] = useState(cellProps.item['column-name'])
            const [isTextInput, setIsTextInput] = useState(refisTextInput || false)
            const [tableLocatorState, setColLocatorState] = useState(refTableLocator)
            const isColType = Boolean(cellProps.item['col-type'])
            const isColumnLocator = Boolean(cellProps.item['column-locator'])
            const isSemanticName = Boolean(cellProps.item['semantic-name'])

            const params = (_paramContext.paramSchema as any)?.component?.props?.params as ParamSchema[]

            if (cellProps.name === 'column-name') {
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
                      onChange={(e) => setColumnName(e.target.value)}
                      size='1'
                      value={columnName}
                    />
                  ) : (
                    <InputSelect.default
                      size='1'
                      value={columnName}
                      onChange={(v) => {
                        onChange(
                          value.map((r) => {
                            if (r.id === cellProps.item.id) {
                              return { ...r, 'column-name': v.toString() }
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
                        ? columnName
                          ? 'Очистите поле ввода чтобы сменить тип ввода на "Выбор из существующих'
                          : 'Выбрать из существующих'
                        : 'Ввести название вручную'
                    }
                  >
                    <Button
                      disabled={!!columnName}
                      variant='outline'
                      square={true}
                      size='1'
                      onClick={() =>
                        setIsTextInput((s) => {
                          ref[id] = { ...ref[id], isTextInput: !s }
                          return !s
                        })
                      }
                    >
                      <Icon name={isTextInput ? 'ChevronDown' : 'Pencil'} />
                    </Button>
                  </Tooltip>
                </Flex>
              )
            }

            if (cellProps.name === 'col-type') {
              const param = params?.find((p) => p.name === 'type')
              const options = (param?.component?.props as { options: Option[] })?.options
              return (
                <Flex gap='2'>
                  <InputSelect.default
                    style={{ width: '100%' }}
                    options={options}
                    variant='surface'
                    disabled={isColumnLocator || isSemanticName}
                    size='1'
                    value={cellProps.item['col-type']}
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
                  value={cellProps.item['semantic-name']}
                  disabled={isColumnLocator || isColType}
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
            if (cellProps.name === 'column-locator') {
              return (
                <Flex direction='column'>
                  <Dctable.Input.default
                    fetchTableList={async ({ sort, dcserviceId, searchFilter, database, page, limit }) => {
                      const ret = await Dcservice.api.findTables.request({
                        dcdatabaseLocator: {
                          dcserviceId,
                          name: database,
                        },
                        sort,
                        where: searchFilter as any,
                        limit,
                        offset: (page - 1) * limit,
                      })

                      return ret.data
                    }}
                    fetchDcserviceList={async () => {
                      const ret = await Dcservice.api.findWithTotal.request({})
                      ref.services = ret.data.items
                      return ret.data
                    }}
                    value={
                      tableLocatorState
                        ? { [`${tableLocatorState.schema}.${tableLocatorState.name}`]: tableLocatorState }
                        : {}
                    }
                    onChange={(value) => {
                      ref[id] = {
                        ...ref[id],
                        tableLocator: Object.values(value)[0],
                      }
                      setColLocatorState(Object.values(value)[0])
                    }}
                    fetchDatabaseList={async (params) => {
                      const ret = await Dcservice.api.findDatabases.request({ id: params.dcserviceId })
                      return ret.data
                    }}
                  />
                  <InputSelect.default
                    value={cellProps.item['column-locator'].column}
                    onValueChange={(colValue) => {
                      setColumnName(colValue)
                      const service = ref.services?.find((s) => s.id === tableLocatorState.dcserviceId)
                      assertDefined(service, { message: 'Dcservise is not defined' })
                      onChange(
                        value.map((r) => {
                          if (r['column-locator'] === cellProps.item['column-locator']) {
                            return {
                              ...r,
                              'column-locator': {
                                database: tableLocatorState.database,
                                schema: tableLocatorState.schema,
                                table: tableLocatorState.name,
                                column: colValue,
                                url: toDatabaseUrl({
                                  client: service.client,
                                  user: service.username,
                                  password: service.password,
                                  database: tableLocatorState.database,
                                  host: service.host,
                                  port: service.port,
                                }),
                              },
                            }
                          }
                          return r
                        }),
                      )
                    }}
                    options={
                      tableLocatorState?.columns?.map((i) => ({ value: i.name, display: i.display || i.name })) || []
                    }
                  />
                </Flex>
              )
            }
          }}
        />
        <Flex mt='2'>
          <Button
            onClick={() =>
              onChange([
                ...value,
                {
                  id: generateId(),
                  'column-name': '',
                  'column-locator': {},
                  'semantic-name': '',
                  'col-type': '',
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

export const initialColumns = [
  {
    display: 'Название колонки',
    name: 'column-name',
  },
  {
    display: 'Тип',
    name: 'col-type',
  },
  {
    display: 'Семантический тип',
    name: 'semantic-name',
  },
  {
    display: 'Словарь',
    name: 'column-locator',
  },
] satisfies ListTable.ColumnProps<Item, StoryContext>[]

export type ToDatabaseUrlParams = {
  user: string
  password: string
  database: string
  host: string
  port: number
  client: string
}

export function toDatabaseUrl(params: ToDatabaseUrlParams): string {
  return `${params.client}://${params.host}:${params.port}/${params.database}?user=${params.user}&password=${params.password}`
}
