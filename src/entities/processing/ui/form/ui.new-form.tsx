import { useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, FieldArray, Row, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { LabeledSelect, type Option } from '~/shared/select'
import { Tabs } from '~/shared/tabs'
import { assertDefined, c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

import { SLICE } from '../../constants'
import type { ExecutableDesign } from '../../w.executable'
import ParamsFieldFactory from '../../w.executable/w.field-factory'
import ExectableForm from '../../w.executable/w.form/ui.form'
// import { type Procedure } from '../../w.procedure'
import InputBlock from './w.input-block'
import OutputBlock from './w.output-block'

export { type Option }

// eslint-disable-next-line @typescript-eslint/ban-types
export type Config = {
  inputTable: string
}

export type Values = {
  name: string
  inputDcdatabaseId: string
  outputDcdatabaseId: string
  outputTable: string
  configs: Record<string, Config>
  multiConfig: Config
}

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  fetchTables: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  fetchExecutableDesigns: () => Promise<ExecutableDesign[]>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTables, fetchDcdatabaseOptions, fetchExecutableDesigns } = props

  const [selectedSingleTableId, setSelectedSingleTableId] = useState<string>()

  const form = useForm<Values>()
  const dcdatabaseId = form.getState().values?.inputDcdatabaseId

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const executableDesignsFetcher = useQuery([NAME, 'executableDesigns'], fetchExecutableDesigns, {
    staleTime: Infinity,
  })

  const executableDesigns = executableDesignsFetcher.data

  const tableOptions =
    Object.values(form.getState().values?.configs || {}).map((c) => ({ value: c.inputTable, display: c.inputTable })) ||
    []

  const tablesFetcher = useQuery(['dcdatabaseTables', dcdatabaseId], () => fetchTables(dcdatabaseId as string), {
    staleTime: Infinity,
    enabled: Boolean(dcdatabaseId),
  })

  const selectedSingleTable = tablesFetcher.data?.find((t) => t.name === selectedSingleTableId)

  // console.log('form', form.getState().values)

  return (
    <Tabs.Root defaultValue='multi'>
      <Tabs.List>
        <Tabs.Trigger value='multi'>Массовая настройка</Tabs.Trigger>
        <Tabs.Trigger value='single'>Одиночная настройка</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='multi' style={{ width: '100%' }}>
        <Flex width='100%' pt='4' direction='column'>
          <Column className={c(props.className, NAME)}>
            <Row width='100%'>
              <Column width='50%'>
                <InputBlock
                  onDcdatabaseIdChange={removeConfigs}
                  onTablesChange={addConfig}
                  fetchTables={fetchTables}
                  fetchDcdatabaseOptions={fetchDcdatabaseOptions}
                />
              </Column>
              <Column width='50%'>
                <OutputBlock fetchTables={fetchTables} fetchDcdatabaseOptions={fetchDcdatabaseOptions} />
              </Column>
            </Row>
            <Row>
              <Column width='100%'>
                {executableDesigns && (
                  <FieldArray name='multyConfig.executables'>
                    {({ fields }) => (
                      <Flex direction='column' gap='4'>
                        {fields.map((name, index) => (
                          <Card>
                            <Flex width='100%' direction='column' gap='4'>
                              <Row justify='between'>
                                <Column width='50%'>
                                  <ExectableForm
                                    key={index}
                                    onNameChange={emptyFn}
                                    name={name}
                                    executableDesigns={executableDesigns}
                                  />
                                </Column>
                                <DangerButton round={true}>
                                  <Icon name='Trash' />
                                </DangerButton>
                              </Row>
                              <ParamsFieldFactory
                                name={name}
                                columns={[]}
                                isSingleMode={false}
                                setMultyValue={emptyFn}
                                executableDesigns={executableDesigns}
                              />
                            </Flex>
                          </Card>
                        ))}
                        <Flex>
                          <Button
                            onClick={() => {
                              fields.push({})
                            }}
                          >
                            Добавить процедуру
                          </Button>
                        </Flex>
                      </Flex>
                    )}
                  </FieldArray>
                )}
              </Column>
            </Row>
          </Column>
        </Flex>
      </Tabs.Content>
      <Tabs.Content value='single'>
        <Flex width='100%' pt='4' direction='column'>
          <Column className={c(props.className, NAME)}>
            <Row width='100%'>
              <Column width='50%'>
                <LabeledSelect.default
                  value={selectedSingleTableId}
                  onChange={(e) => setSelectedSingleTableId(e.toString())}
                  options={tableOptions}
                />
              </Column>
            </Row>
          </Column>
        </Flex>
      </Tabs.Content>
    </Tabs.Root>
  )

  /**
   * private
   */

  function removeConfigs() {
    form.change(`configs`, {})
  }

  function addConfig(tableNames: string[]) {
    const formState = form.getState()
    const dcdatabaseId = formState.values?.inputDcdatabaseId
    assertDefined(dcdatabaseId)
    const currentTableNames = Object.values(form.getState().values?.configs || {}).map((c) => c.inputTable) || []
    const tablesToRemove = currentTableNames.filter((tableName) => !tableNames.includes(tableName))

    tablesToRemove.forEach((tableName) => {
      // @ts-ignore
      form.change(`configs.${tableName}`, undefined)
    })

    tableNames.forEach((tableName) => {
      if (formState.values?.configs?.[tableName]) return

      if (!formState.values.multiConfig) {
        const config: Config = {
          inputTable: tableName,
        }
        // @ts-ignore
        form.change(`configs.${tableName}`, config)
      }
    })
  }
}

Component.displayName = NAME
