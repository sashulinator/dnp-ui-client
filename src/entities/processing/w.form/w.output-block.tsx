import { Tooltip } from '@radix-ui/themes'

import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Button from '~/shared/button'
import {
  Card,
  Column,
  Select as FormSelect,
  type SelectMultipleOption as Option,
  Row,
  TypedField,
  TypedStringField,
  TypedUnionField,
  useField,
  useForm,
} from '~/shared/form'
import Icon from '~/shared/icon'
import { type SetterOrUpdater, c } from '~/utils/core'

import { SLICE } from '../constants'

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  fetchTables: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  isTextInput: boolean
  setIsTextInput: SetterOrUpdater<boolean>
}

const NAME = `${APP}-${SLICE}-Form-w-OutputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, fetchTables, fetchDcdatabaseOptions, isTextInput, setIsTextInput } = props

  const dcdatabaseField = useField('outputDcdatabaseId', { subscription: { value: true } })
  const outputTableField = useField('outputTable', { subscription: { value: true } })
  const dcdatabaseId = dcdatabaseField.input.value

  const databasesOptionsfetcher = useQuery([NAME, 'databasesOptions'], () => fetchDcdatabaseOptions(), {
    staleTime: Infinity,
  })

  const tablesFetcher = useQuery(['dcdatabaseTables', dcdatabaseId], () => fetchTables(dcdatabaseId as string), {
    staleTime: Infinity,
    enabled: Boolean(dcdatabaseId),
  })

  const tableOptions = useMemo(
    () => tablesFetcher.data?.map((item) => ({ value: item.name, display: item.name || item.display })) || [],
    [tablesFetcher.data],
  )

  const form = useForm()

  return (
    <Card label='Вывод' className={c(NAME, className)}>
      <Column width='100%'>
        <TypedUnionField
          testValueType={TypedUnionField.testValueType}
          name='outputDcdatabaseId'
          loading={databasesOptionsfetcher.isFetching}
          label='База данных'
          onChange={() => {
            form.change(`outputTable`, undefined)
          }}
          options={databasesOptionsfetcher.data || []}
        />
        <Row align='end'>
          {isTextInput ? (
            <TypedStringField testValueType={TypedStringField.testValueType} name='outputTable' label='Таблица' />
          ) : (
            <TypedField
              loading={tablesFetcher.isFetching}
              label='Таблица'
              name='outputTable'
              component={FormSelect}
              options={tableOptions}
            />
          )}
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
