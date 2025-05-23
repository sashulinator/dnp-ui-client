import { useCallback, useEffect, useRef } from 'react'

import { APP } from '~/app/constants.app'
import { Dcdatabase, Dcservice, Dctable } from '~/entities/database-container'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, Field, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import TextInput from '~/shared/text-input'
import { c } from '~/utils/core'

import { SLICE } from '../constants'

type Column = { name: string; display: string; type: string }
export type TableLocator = {
  name: string
  schema: string
  database: string
  dcserviceId: string
}

export interface Props {
  className?: string | undefined
  disabled?: boolean | undefined
  dcdatabase: Dcdatabase.DatabaseValue | undefined
  dcservice: (Dcservice.DcserviceDisplayWithId & { dcserviceId?: string | undefined }) | undefined
  isTextInput: boolean
  setIsTextInput: (value: boolean) => void
  setDcdatabase: (value: Dcdatabase.DatabaseValue | undefined) => void
  setDcserviceValue: (
    value: (Dcservice.DcserviceDisplayWithId & { dcserviceId?: string | undefined }) | undefined,
  ) => void
  fetchTableList: (params: {
    sort: Dctable.ListTable.ItemSort | undefined
    searchFilter: Dctable.ListTable.ItemSearchFilter | undefined
    database: string
    dcserviceId: string
    page: number
    limit: number
  }) => Promise<{ items: { name: string; display?: string | undefined; schema: string }[]; total: number }>
}

const NAME = `${APP}-${SLICE}-Form-w-OutputBlock`

export default function Component(props: Props): JSX.Element {
  const {
    className,
    fetchTableList,
    setIsTextInput,
    setDcdatabase,
    setDcserviceValue,
    isTextInput,
    dcservice,
    dcdatabase,
    disabled,
  } = props

  const tableRef = useRef<HTMLInputElement>(null)

  const form = useForm()

  useEffect(() => {
    if (dcservice) {
      form.change('outputDctableLocator', {
        ...dcservice,
        ...form.getState().values['outputDctableLocator'],
        database: dcdatabase?.name,
      })
    }
  }, [])

  return (
    <Card label='Вывод' className={c(NAME, className)}>
      <Column>
        <Field.default<
          Dcservice.Picker.DisplayWithId & { dcserviceId?: string; name?: string; schema?: string; database?: string }
        >
          name='outputDctableLocator'
          subscription={{ value: true }}
        >
          {({ input }) => {
            return (
              <>
                <Dcservice.Picker.default
                  enabled={!disabled}
                  fetcherDependencies={[disabled]}
                  fetchList={async (params) => {
                    const ret = await Dcservice.api.findWithTotal.request({
                      take: params.limit,
                      skip: (params.page - 1) * params.limit,
                    })
                    return ret.data
                  }}
                  fetchDisplay={async (params) => {
                    if (!params.id) return
                    return Dcservice.api.getById.request({ id: params?.id }).then((d) => d.data)
                  }}
                  value={{ id: input.value.dcserviceId }}
                  onValueChange={(v) => {
                    input.onChange({ ...v, dcserviceId: v?.id } as any)
                    setDcserviceValue({ ...v, dcserviceId: v?.id } as any)
                  }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  renderTrigger={useCallback(({ enabled, setIsOpen, value, setValue }) => {
                    return (
                      <Dcservice.Input.default
                        hasValue={!!value?.id}
                        disabled={!enabled}
                        fetchDisplay={async () => {
                          if (!value?.id) return
                          return Dcservice.api.getById.request({ id: value.id }).then((d) => d.data)
                        }}
                        fetcherDependencies={[value]}
                        onClearableClick={() => setValue(undefined)}
                        onClick={() => setIsOpen(true)}
                      />
                    )
                  }, [])}
                />
                <Dcdatabase.Picker.default
                  fetcherDependencies={[input.value.id]}
                  enabled={!!input.value.id && !disabled}
                  fetchList={async (params) => {
                    const ret = await Dcservice.api.findDatabases.request({ ...params, id: input.value.id as string })
                    return ret.data
                  }}
                  value={input.value?.database ? { name: input.value.database } : undefined}
                  onChange={(value) => {
                    input.onChange({ ...input.value, database: value?.name })
                    setDcdatabase(value)
                  }}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  renderTrigger={useCallback(({ enabled, setIsOpen, value, setValue }) => {
                    return (
                      <Dcdatabase.Input.default
                        disabled={!enabled}
                        fetchValue={() => value}
                        fetcherDependencies={[value, input.value.id]}
                        onClearableClick={() => setValue(undefined)}
                        onClick={() => setIsOpen(true)}
                      />
                    )
                  }, [])}
                />
                <Flex align='end' gap='2'>
                  <Dctable.Picker.default
                    enabled={!!input.value.database && !disabled}
                    fetcherDependencies={[input.value.id, input.value.database]}
                    fetchTableList={(params) => {
                      return fetchTableList({
                        ...params,
                        database: input.value.database,
                        dcserviceId: input.value.id,
                      } as any)
                    }}
                    value={{ name: input.value?.name, schema: input.value?.schema } as any}
                    onChange={(value) => {
                      input.onChange({ ...input.value, name: value?.name, schema: value?.schema })
                    }}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    renderTrigger={useCallback(
                      ({ enabled, setIsOpen, value, setValue }) => {
                        return (
                          <Field.default name='outputTable'>
                            {({ input }) => {
                              return (
                                <Flex gap='2' width='100%'>
                                  {isTextInput ? (
                                    <Flex direction='column' width='100%' gap='1'>
                                      <TextInput
                                        left={
                                          <Flex asChild={true} justify='center' align='center'>
                                            <Text
                                              style={{
                                                color: enabled ? 'var(--accent-11)' : 'var(--gray-11)',
                                                padding: 'var(--space-3)',
                                              }}
                                            >
                                              <Icon name='DatabaseSchema' />
                                            </Text>
                                          </Flex>
                                        }
                                        disabled={!enabled}
                                        ref={tableRef}
                                        clearable={true}
                                        variant='soft'
                                        value={value?.schema}
                                        placeholder='schema'
                                        onValueChange={(v) => setValue({ name: value?.name, schema: v })}
                                        onBlur={input.onBlur}
                                        onFocus={input.onFocus}
                                        style={{ width: '100%' }}
                                      />
                                      <TextInput
                                        left={
                                          <Flex asChild={true} justify='center' align='center'>
                                            <Text
                                              style={{
                                                color: enabled ? 'var(--accent-11)' : 'var(--gray-11)',
                                                padding: 'var(--space-3)',
                                              }}
                                            >
                                              <Icon name='Table' />
                                            </Text>
                                          </Flex>
                                        }
                                        disabled={!enabled}
                                        ref={tableRef}
                                        clearable={true}
                                        variant='soft'
                                        value={value?.name}
                                        placeholder='table'
                                        onValueChange={(v) => setValue({ name: v, schema: value?.schema })}
                                        onBlur={input.onBlur}
                                        onFocus={input.onFocus}
                                        style={{ width: '100%' }}
                                      />
                                    </Flex>
                                  ) : (
                                    <Flex width='100%' align='end'>
                                      <Dctable.Input.default
                                        disabled={!enabled}
                                        fetchValue={() => value as any}
                                        fetcherDependencies={[value, input.value.id]}
                                        onClearableClick={() => setValue(undefined)}
                                        onClick={() => setIsOpen(true)}
                                      />
                                    </Flex>
                                  )}
                                  <Flex>
                                    <Button
                                      variant='outline'
                                      square={true}
                                      disabled={!enabled}
                                      onClick={() => {
                                        setIsTextInput(!isTextInput)

                                        if (!isTextInput) {
                                          setTimeout(() => {
                                            tableRef?.current?.focus()
                                            setValue({ ...value, name: '', schema: 'public' })
                                          }, 10)
                                        } else {
                                          setValue({ ...value, name: '', schema: 'public' })
                                        }
                                      }}
                                    >
                                      <Icon name={isTextInput ? 'ChevronDown' : 'Pencil'} />
                                    </Button>
                                  </Flex>
                                </Flex>
                              )
                            }}
                          </Field.default>
                        )
                      },
                      [isTextInput],
                    )}
                  />
                </Flex>
              </>
            )
          }}
        </Field.default>
      </Column>
    </Card>
  )
}

Component.displayName = NAME
