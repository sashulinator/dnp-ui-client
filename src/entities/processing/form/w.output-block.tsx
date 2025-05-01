import { Tooltip } from '@radix-ui/themes'

import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, Field, Row, useField, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import Labeled from '~/shared/labeled'
import { InputSelect } from '~/shared/select'
import TextInput from '~/shared/text-input'
import { type SetterOrUpdater, c } from '~/utils/core'

import { SLICE } from '../constants'

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  fetchTablesByDcdatabaseId: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<InputSelect.Option[]>
  isTextInput: boolean
  setIsTextInput: SetterOrUpdater<boolean>
}

const NAME = `${APP}-${SLICE}-Form-w-OutputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, fetchTablesByDcdatabaseId, fetchDcdatabaseOptions, isTextInput, setIsTextInput } = props

  const outputDcdatabaseIdField = useField('outputDcdatabaseId', { subscription: { value: true } })
  const outputTableField = useField('outputTable', { subscription: { value: true } })
  const dcdatabaseId = outputDcdatabaseIdField.input.value

  const databasesOptionsfetcher = useQuery([NAME, 'databasesOptions'], () => fetchDcdatabaseOptions(), {
    staleTime: Infinity,
  })

  const tablesFetcher = useQuery(
    ['dcdatabaseTables', dcdatabaseId],
    () => fetchTablesByDcdatabaseId(dcdatabaseId as string),
    {
      staleTime: Infinity,
      enabled: Boolean(dcdatabaseId),
    },
  )

  const tableOptions = useMemo(
    () => tablesFetcher.data?.map((item) => ({ value: item.name, display: item.name || item.display })) || [],
    [tablesFetcher.data],
  )

  const form = useForm()

  return (
    <Card label='Вывод' className={c(NAME, className)}>
      <Column width='100%'>
        <Field name='outputDcdatabaseId'>
          {({ input }) => {
            return (
              <Flex direction='column'>
                <Labeled label='База данных'>
                  <InputSelect.default
                    {...input}
                    loading={databasesOptionsfetcher.isFetching}
                    onValueChange={() => {
                      form.change(`outputTable`, undefined)
                    }}
                    options={databasesOptionsfetcher.data || []}
                  />
                </Labeled>
              </Flex>
            )
          }}
        </Field>

        <Row align='end'>
          <Field name='outputTable'>
            {({ input }) => {
              return (
                <Flex direction='column' width='100%'>
                  <Labeled label='Таблица'>
                    {isTextInput ? (
                      <TextInput variant='soft' {...input} />
                    ) : (
                      <InputSelect.default {...input} loading={tablesFetcher.isFetching} options={tableOptions} />
                    )}
                  </Labeled>
                </Flex>
              )
            }}
          </Field>

          <Tooltip
            content={
              isTextInput
                ? outputTableField.input.value
                  ? 'Очистите поле ввода чтобы сменить тип ввода на "Выбор из существующих'
                  : 'Выбрать из существующих'
                : 'Ввести название вручную'
            }
          >
            <Button
              disabled={isTextInput && outputTableField.input.value}
              variant='outline'
              square={true}
              onClick={() => setIsTextInput(!isTextInput)}
            >
              <Icon name={isTextInput ? 'ChevronDown' : 'Pencil'} />
            </Button>
          </Tooltip>
        </Row>
      </Column>
    </Card>
  )
}

Component.displayName = NAME
