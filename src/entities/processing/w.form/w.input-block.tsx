import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { Card, Column, TypedUnionField, useField, useForm } from '~/shared/form'
import { type Option } from '~/shared/select'
import { LabeledSelectMultiple } from '~/shared/select-multiple'
import { c } from '~/utils/core'

import { SLICE } from '../constants'
import { type Values } from './ui.new-form'

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  fetchTables: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  onTablesChange: (tables: string[]) => void
  onDcdatabaseIdChange: (id: string) => void
  tableDisabled: boolean
}

const NAME = `${APP}-${SLICE}-Form-w-InputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, tableDisabled, fetchTables, fetchDcdatabaseOptions, onTablesChange, onDcdatabaseIdChange } = props

  const dcdatabaseField = useField('inputDcdatabaseId', { subscription: { value: true } })
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

  const form = useForm<Values>()

  const tablesValue = Object.values(form.getState().values?.configs || {}).map((c) => c.inputTable) || []

  return (
    <Card label='Вход' className={c(NAME, className)}>
      <Column width='100%'>
        <TypedUnionField<Values, 'inputDcdatabaseId'>
          testValueType={TypedUnionField.testValueType}
          name='inputDcdatabaseId'
          label='База данных'
          loading={databasesOptionsfetcher.isFetching}
          onChange={(e) => {
            onDcdatabaseIdChange(e.toString())
          }}
          options={databasesOptionsfetcher.data || []}
        />
        <LabeledSelectMultiple.default
          variant='soft'
          loading={tablesFetcher.isFetching}
          label='Таблицы'
          value={tablesValue}
          disabled={tableDisabled}
          options={tableOptions}
          onValueChange={(tables) => onTablesChange(tables)}
        />
      </Column>
    </Card>
  )
}

Component.displayName = NAME
