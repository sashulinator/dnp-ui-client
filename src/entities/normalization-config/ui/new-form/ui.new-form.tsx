import { useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Flex from '~/shared/flex'
import { Card, Column, Select as FormSelect, Label, Row, SelectMultiple, TypedField, useForm } from '~/shared/form'
import Select from '~/shared/select'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import { SLICE } from '../../constants.slice'

export type Option = {
  value: string
  display: string
}

export interface Props {
  className?: string | undefined
  fetchTablesOptions: (dcdatabaseId: string) => Promise<Option[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
}

const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTablesOptions, fetchDcdatabaseOptions } = props

  const [inputDcdatabaseId, setInputDcdatabaseId] = useState<string>('')
  const [outputDcdatabaseId, setOutputDcdatabaseId] = useState<string>('')

  const inputTablesOptionsFetcher = useQuery([NAME, inputDcdatabaseId], () => fetchTablesOptions(inputDcdatabaseId), {
    staleTime: Infinity,
  })
  const outputTablesOptionsfetcher = useQuery(
    [NAME, outputDcdatabaseId],
    () => fetchTablesOptions(outputDcdatabaseId),
    { staleTime: Infinity },
  )
  const databasesOptionsfetcher = useQuery([NAME, 'databasesOptions'], () => fetchDcdatabaseOptions(), {
    staleTime: Infinity,
  })

  const form = useForm()

  return (
    <Column className={c(props.className, NAME)}>
      <Row width='100%' className='333'>
        <Column width='50%'>
          <Card>
            <Text size='1' color='gray'>
              Вход
            </Text>
            <Column width='100%'>
              <Flex width='100%' direction='column'>
                <Label>База данных</Label>
                <Select.Root
                  value={inputDcdatabaseId}
                  onValueChange={(value) => {
                    setInputDcdatabaseId(value)
                    form.change('inputTables', undefined)
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
                label='Таблицы'
                name='inputTables'
                component={SelectMultiple}
                options={inputTablesOptionsFetcher.data || []}
              />
            </Column>
          </Card>
        </Column>
        <Column width='50%'>
          <Card>
            <Text size='1' color='gray'>
              Вывод
            </Text>
            <Row>
              <Column width='100%'>
                <Flex width='100%' direction='column'>
                  <Label>База данных</Label>
                  <Select.Root
                    value={outputDcdatabaseId}
                    onValueChange={(value) => {
                      setOutputDcdatabaseId(value)
                      form.change('inputTables', undefined)
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
                  name='outputTable'
                  component={FormSelect}
                  options={outputTablesOptionsfetcher.data || []}
                />
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
    </Column>
  )
}

Component.displayName = NAME
