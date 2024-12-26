import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, FieldArray, Row, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { LabeledSelect, type Option } from '~/shared/select'
import { Tabs } from '~/shared/tabs'
import { type Any, type SetterOrUpdater, assertDefined, c, generateId } from '~/utils/core'
import { emptyFn } from '~/utils/function'

import { SLICE } from '../constants'
import type { ExecutableSchema } from '../w.executable'
import ParamsFieldFactory from '../w.executable/w.field-factory'
import ExectableForm from '../w.executable/w.form/ui.form'
// import { type Procedure } from '../../w.procedure'
import InputBlock from './w.input-block'
import OutputBlock from './w.output-block'

export { type Option }

type Executables = {
  name: string
  params?: Record<string, unknown> | undefined
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Config = {
  inputTable: string
  executables: Executables[]
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
  fetchExecutableSchemas: () => Promise<ExecutableSchema[]>
  tabValue: 'multi' | 'single'
  setTabValue: SetterOrUpdater<'multi' | 'single'>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTables, fetchDcdatabaseOptions, fetchExecutableSchemas, tabValue, setTabValue } = props

  const [selectedSingleTableName, setSelectedSingleTableName] = useState<string>()
  const [isTextInput, setIsTextInput] = useState(false)

  const form = useForm<Values>()
  const dcdatabaseId = form.getState().values?.inputDcdatabaseId

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const executableSchemasFetcher = useQuery([NAME, 'executableSchemas'], fetchExecutableSchemas, {
    staleTime: Infinity,
  })

  const executableSchemas = executableSchemasFetcher.data

  const tableOptions =
    Object.values(form.getState().values?.configs || {}).map((c) => ({ value: c.inputTable, display: c.inputTable })) ||
    []

  const tablesFetcher = useQuery(['dcdatabaseTables', dcdatabaseId], () => fetchTables(dcdatabaseId as string), {
    staleTime: Infinity,
    enabled: Boolean(dcdatabaseId),
  })

  const selectedSingleTable = useMemo(
    () => tablesFetcher.data?.find((t) => t.name === selectedSingleTableName),
    [selectedSingleTableName],
  )

  return (
    <Tabs.Root value={tabValue} onValueChange={(v) => setTabValue(v as 'multi')}>
      <Tabs.List>
        <Tabs.Trigger value='multi'>Массовая настройка</Tabs.Trigger>
        <Tabs.Trigger value='single'>Потабличная настройка</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='multi' style={{ width: '100%' }}>
        <Flex width='100%' pt='4' direction='column'>
          <Column className={c(props.className, NAME)}>
            <Row width='100%'>
              <Column width='50%'>
                <InputBlock
                  tableDisabled={!!form.getState().values?.multiConfig?.executables?.length}
                  onDcdatabaseIdChange={removeConfigs}
                  onTablesChange={addConfig}
                  fetchTables={fetchTables}
                  fetchDcdatabaseOptions={fetchDcdatabaseOptions}
                />
              </Column>
              <Column width='50%'>
                <OutputBlock
                  setIsTextInput={setIsTextInput}
                  isTextInput={isTextInput}
                  fetchTables={fetchTables}
                  fetchDcdatabaseOptions={fetchDcdatabaseOptions}
                />
              </Column>
            </Row>
            <Row>
              <Column width='100%'>
                {executableSchemas && dcdatabaseId && (
                  <FieldArray name='multiConfig.executables'>
                    {({ fields }) => (
                      <Flex direction='column' gap='4'>
                        {fields.map((formName, index) => (
                          <Card label='Процедура' key={index}>
                            <Flex width='100%' direction='column' gap='4'>
                              <Row justify='between'>
                                <Column width='50%'>
                                  <ExectableForm
                                    key={index}
                                    onNameChange={(name) => changeExecutableName(name, formName)}
                                    name={formName}
                                    executableSchemas={executableSchemas}
                                  />
                                </Column>
                                <DangerButton
                                  variant='soft'
                                  round={true}
                                  onClick={() => {
                                    fields.remove(index)
                                  }}
                                >
                                  <Icon name='Trash' />
                                </DangerButton>
                              </Row>
                              <ParamsFieldFactory
                                name={formName}
                                columns={[]}
                                isSingleMode={false}
                                setUniqValues={setUniqValues}
                                setMultyValue={setMultyParamValue}
                                executableSchemas={executableSchemas}
                              />
                            </Flex>
                          </Card>
                        ))}
                        <Flex>
                          <Button
                            variant='soft'
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
            <Card label='Вход'>
              <Row width='100%'>
                <Column width='50%'>
                  <LabeledSelect.default
                    label='Таблица'
                    value={selectedSingleTableName}
                    onChange={(e) => setSelectedSingleTableName(e.toString())}
                    options={tableOptions}
                  />
                </Column>
                <Column width='50%' />
              </Row>
            </Card>
            {selectedSingleTable && (
              <Row key={selectedSingleTable.name}>
                <Column width='100%'>
                  {executableSchemas && (
                    <FieldArray key={selectedSingleTable.name} name={`configs.${selectedSingleTable.name}.executables`}>
                      {({ fields }) => (
                        <Flex direction='column' gap='4'>
                          {fields.map((formName, index) => (
                            <Card key={index} label='Процедура'>
                              <Flex width='100%' direction='column' gap='4'>
                                <Row justify='between' style={{ position: 'relative' }}>
                                  <Column width='50%'>
                                    <ExectableForm
                                      key={index}
                                      readonly={true}
                                      onNameChange={(name) => changeExecutableName(name, formName)}
                                      name={formName}
                                      executableSchemas={executableSchemas}
                                    />
                                  </Column>
                                  <Column width='50%' />
                                  <DangerButton
                                    variant='soft'
                                    round={true}
                                    onClick={() => fields.remove(index)}
                                    style={{ position: 'absolute', right: 'var(--space-2)', top: 'var(--space-2)' }}
                                  >
                                    <Icon name='Trash' />
                                  </DangerButton>
                                </Row>
                                <ParamsFieldFactory
                                  name={formName}
                                  columns={selectedSingleTable.columns}
                                  isSingleMode={true}
                                  setMultyValue={emptyFn}
                                  executableSchemas={executableSchemas}
                                />
                              </Flex>
                            </Card>
                          ))}
                        </Flex>
                      )}
                    </FieldArray>
                  )}
                </Column>
              </Row>
            )}
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

  function setUniqValues(getValue: (currentValue: unknown) => unknown, formName: string) {
    Object.values(form.getState().values.configs || {}).forEach((config) => {
      const table = tablesFetcher.data?.find((t) => t.name === config.inputTable)

      const uniqValue = getValue({
        values: form.getState().values,
        generateId,
        columns: table?.columns,
        table,
      })

      form.change(formName.replace('multiConfig', `configs.${config.inputTable}`) as Any, uniqValue)
    })
  }

  function setMultyParamValue(value: unknown, formName: string) {
    form.change(formName as any, value)
    Object.values(form.getState().values.configs || {}).forEach((config) => {
      form.change(formName.replace('multiConfig', `configs.${config.inputTable}`) as Any, value)
    })
  }

  function changeExecutableName(name: string, formName: string) {
    const executableSchema = executableSchemas?.find((executableSchema) => executableSchema.name === name)

    const initialValues = executableSchema?.params?.reduce<Record<string, unknown>>((acc, paramSchema) => {
      if (paramSchema.unique) return acc
      acc[paramSchema.name] = new Function('context', paramSchema.getInitialValue || '')({
        values: form.getState().values,
        paramSchema,
        formState: form.getState().values,
        generateId,
      })
      return acc
    }, {})

    form.change(formName as Any, { name, params: initialValues })

    Object.values(form.getState().values.configs || {}).forEach((config) => {
      const table = tablesFetcher.data?.find((t) => t.name === config.inputTable)

      const uniqInitialValues = executableSchema?.params?.reduce<Record<string, unknown>>((acc, paramSchema) => {
        if (!paramSchema.unique) return acc
        acc[paramSchema.name] = new Function('context', paramSchema.getInitialValue || '')({
          values: form.getState().values,
          paramSchema,
          generateId,
          formState: form.getState().values,
          columns: table?.columns,
          table,
        })
        return acc
      }, {})

      form.change(formName.replace('multiConfig', `configs.${config.inputTable}`) as Any, {
        name,
        params: { ...initialValues, ...uniqInitialValues },
      })
    })
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
          executables: [],
        }
        // @ts-ignore
        form.change(`configs.${tableName}`, config)
      }
    })
  }
}

Component.displayName = NAME
