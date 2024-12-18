import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import {
  Card,
  Column,
  Select as FormSelect,
  type SelectMultipleOption as Option,
  TypedField,
  TypedUnionField,
  useField,
  useForm,
} from '~/shared/form'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import { SLICE } from '../../constants'

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  fetchTables: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
}

const NAME = `${APP}-${SLICE}-Form-w-OutputBlock`

export default function Component(props: Props): JSX.Element {
  const { className, fetchTables, fetchDcdatabaseOptions } = props

  const dcdatabaseField = useField('outputDcdatabase', { subscription: { value: true } })
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
    <Card className={c(NAME, className)}>
      <Text size='1' color='gray'>
        Вывод
      </Text>
      <Column width='100%'>
        <TypedUnionField
          testValueType={TypedUnionField.testValueType}
          name='outputDcdatabase'
          label='База данных'
          onChange={() => {
            form.change(`outputTable`, undefined)
          }}
          options={databasesOptionsfetcher.data || []}
        />
        <TypedField label='Таблица' name='outputTable' component={FormSelect} options={tableOptions} />
      </Column>
    </Card>
  )
}

Component.displayName = NAME
