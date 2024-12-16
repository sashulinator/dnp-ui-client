import { useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Select as FormSelect, Label, TypedField, useForm } from '~/shared/form'
import Select, { type Option } from '~/shared/select'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import { SLICE } from '../../constants'

export interface Props {
  className?: string | undefined
  fetchTablesOptions: (dcdatabaseId: string) => Promise<Option[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
}

const NAME = `${APP}-${SLICE}-Form-w-OutputBlock`

export default function Component(props: Props): JSX.Element {
  const OUTPUT_TABLE_NAME = 'outputTable'

  const { className, fetchTablesOptions, fetchDcdatabaseOptions } = props

  const [dcdatabaseId, setInputDcdatabaseId] = useState<string>('')

  const databasesOptionsfetcher = useQuery([NAME, 'databasesOptions'], () => fetchDcdatabaseOptions(), {
    staleTime: Infinity,
  })

  const tablesOptionsFetcher = useQuery([NAME, dcdatabaseId], () => fetchTablesOptions(dcdatabaseId), {
    staleTime: Infinity,
    enabled: Boolean(dcdatabaseId),
  })

  const form = useForm()

  return (
    <Card className={c(NAME, className)}>
      <Text size='1' color='gray'>
        Вывод
      </Text>
      <Column width='100%'>
        <Flex width='100%' direction='column'>
          <Label>База данных</Label>
          <Select.Root
            value={dcdatabaseId}
            onValueChange={(value) => {
              setInputDcdatabaseId(value)
              form.change(OUTPUT_TABLE_NAME, undefined)
            }}
          >
            <Select.Trigger variant='soft' />
            <Select.Content>
              <Select.Group>
                {databasesOptionsfetcher.data?.map((option, i) => {
                  return (
                    <Select.Item key={i} {...option}>
                      {option.display}
                    </Select.Item>
                  )
                })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <TypedField
          label='Таблица'
          name={OUTPUT_TABLE_NAME}
          component={FormSelect}
          options={tablesOptionsFetcher.data || []}
        />
      </Column>
    </Card>
  )
}

Component.displayName = NAME
