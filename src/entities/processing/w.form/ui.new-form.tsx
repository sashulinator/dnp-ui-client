import { useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { Dcservice, Dctable } from '~/entities/database-container'
import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, FieldArray, Row, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { LabeledSelect, type Option } from '~/shared/select'
import { Tabs } from '~/shared/tabs'
import { type Any, type Dictionary, type SetterOrUpdater, assertDefined, c, generateId } from '~/utils/core'
import { emptyFn } from '~/utils/function'

import { SLICE } from '../constants'
import type { ExecutableSchema } from '../w.executable'
import ParamsFieldFactory from '../w.executable/w.field-factory'
import ExectableForm from '../w.executable/w.form/ui.form'
// import { type Procedure } from '../../w.procedure'
import InputBlock, { type TableLocator } from './w.input-block'
import OutputBlock from './w.output-block'

export { type Option }

type Executables = {
  name: string
  params?: Record<string, unknown> | undefined
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Config = {
  inputDctableLocator: Dctable.DctableLocator
  executables: Executables[]
}

export type Values = {
  name: string
  outputDcdatabaseId: string
  outputTable: string
  configs: Record<string, Config>
  multiConfig: Config
}

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  tabValue: 'multi' | 'single'
  fetchTablesByDcdatabaseId: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  fetchExecutableSchemas: () => Promise<ExecutableSchema[]>
  setTabValue: SetterOrUpdater<'multi' | 'single'>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { fetchTablesByDcdatabaseId, fetchDcdatabaseOptions, fetchExecutableSchemas, tabValue, setTabValue } = props

  const [selectedDctableLocator, setSelectedSingleDctableLocator] = useState<Dctable.DctableLocator>()
  const [isTextInput, setIsTextInput] = useState(false)

  const inputTablesMeta = useRef<Map<string, Dctable.DctableMeta>>(new Map())

  const form = useForm<Values>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const executableSchemasFetcher = useQuery([NAME, 'executableSchemas'], fetchExecutableSchemas, {
    staleTime: Infinity,
  })

  const executableSchemas = executableSchemasFetcher.data

  const tableOptions =
    Object.values(form.getState().values?.configs || {}).map((c) => ({
      value: c.inputDctableLocator.name,
      display: c.inputDctableLocator.name,
    })) || []

  const selectedSingleDctableLocator = useMemo(
    () =>
      Object.values(form.getState().values.configs || {})?.find((c) =>
        Dctable.isSameLocator(c.inputDctableLocator, selectedDctableLocator),
      )?.inputDctableLocator,
    [selectedDctableLocator],
  )

  console.log('kkkkk', selectedSingleDctableLocator)

  // работает только для аутпута
  const tablesFetcher = useQuery(
    ['dcdatabaseTables', selectedSingleDctableLocator],
    () => fetchTablesByDcdatabaseId(selectedSingleDctableLocator?.database as string),
    {
      staleTime: Infinity,
      enabled: Boolean(selectedSingleDctableLocator),
    },
  )

  const selectedSingleTable = useMemo(() => {
    if (!selectedSingleDctableLocator) return
    return inputTablesMeta.current.get(Dctable.buildFqn(selectedSingleDctableLocator))
  }, [selectedSingleDctableLocator])

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
                  onInputChange={manageConfigs}
                  fetchDcdatabaseOptions={fetchDcdatabaseOptions}
                  fetchTableList={async ({ sort, searchFilter, database, page, limit }) => {
                    const ret = await Dcservice.api.findTables.request({
                      dcdatabaseLocator: {
                        dcserviceId: 'workshop',
                        name: database,
                      },
                      sort,
                      where: searchFilter as any,
                      limit,
                      offset: (page - 1) * limit,
                    })

                    ret.data.items.forEach((i) => {
                      inputTablesMeta.current.set(Dctable.buildFqn(i), i)
                    })

                    return ret.data
                  }}
                />
              </Column>
              <Column width='50%'>
                <OutputBlock
                  setIsTextInput={setIsTextInput}
                  isTextInput={isTextInput}
                  fetchTablesByDcdatabaseId={fetchTablesByDcdatabaseId}
                  fetchDcdatabaseOptions={fetchDcdatabaseOptions}
                />
              </Column>
            </Row>
            <Row>
              <Column width='100%'>
                {Object.values(form.getState().values?.configs || {}).length > 0 && executableSchemas && (
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
                    value={selectedDctableLocator?.name}
                    onChange={(e) => {
                      const name = e.toString()
                      const dctableLocator = Object.values(form.getState().values?.configs || {}).find(
                        (i) => i.inputDctableLocator.name === name,
                      )?.inputDctableLocator
                      setSelectedSingleDctableLocator(dctableLocator)
                    }}
                    options={tableOptions}
                  />
                </Column>
                <Column width='50%' />
              </Row>
            </Card>
            {selectedSingleDctableLocator && (
              <Row key={selectedSingleDctableLocator.name}>
                <Column width='100%'>
                  {executableSchemas && (
                    <FieldArray
                      key={selectedSingleDctableLocator.name}
                      name={`configs.${Dctable.buildFqn(selectedSingleDctableLocator)}.executables`}
                    >
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
                                  columns={selectedSingleTable?.columns || []}
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
      const table = tablesFetcher.data?.find((t) => t.name === config.inputDctableLocator.name)

      const uniqValue = getValue({
        values: form.getState().values,
        generateId,
        columns: table?.columns,
        table,
      })

      form.change(
        formName.replace('multiConfig', `configs.${Dctable.buildFqn(config.inputDctableLocator)}`) as Any,
        uniqValue,
      )
    })
  }

  function setMultyParamValue(value: unknown, formName: string) {
    form.change(formName as any, value)
    Object.values(form.getState().values.configs || {}).forEach((config) => {
      form.change(
        formName.replace('multiConfig', `configs.${Dctable.buildFqn(config.inputDctableLocator)}`) as Any,
        value,
      )
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
      const dctableMeta = inputTablesMeta.current.get(Dctable.buildFqn(config.inputDctableLocator))

      const uniqInitialValues = executableSchema?.params?.reduce<Record<string, unknown>>((acc, paramSchema) => {
        if (!paramSchema.unique) return acc

        acc[paramSchema.name] = new Function('context', paramSchema.getInitialValue || '')({
          values: form.getState().values,
          paramSchema,
          generateId,
          formState: form.getState().values,
          columns: dctableMeta?.columns,
          table: dctableMeta,
        })
        return acc
      }, {})

      form.change(formName.replace('multiConfig', `configs.${Dctable.buildFqn(config.inputDctableLocator)}`) as Any, {
        name,
        params: { ...initialValues, ...uniqInitialValues },
      })
    })
  }

  /**
   * Менеджерит конфиги в форме на основании выбраных/убранных tableLocators
   * @param {Dictionary<TableLocator>} tableLocators словарь локаторов выбранных пользователем
   */
  function manageConfigs(tableLocators: Dictionary<TableLocator>) {
    const formState = form.getState()
    const tableLocatorsList = Object.values(tableLocators)
    const configInputDctableLocators =
      Object.values(form.getState().values?.configs || {}).map((c) => c.inputDctableLocator) || []
    const tableLocatorsToRemove = configInputDctableLocators.filter(
      (c) => !tableLocatorsList.some((t) => Dctable.isSameLocator(c, t)),
    )

    tableLocatorsToRemove.forEach((tableLocator) => {
      // @ts-ignore
      form.change(`configs.${Dctable.buildFqn(tableLocator)}`, undefined)
    })

    tableLocatorsList.forEach((dctableLocator) => {
      assertDefined(dctableLocator)

      if (!formState.values.multiConfig) {
        const config: Config = {
          inputDctableLocator: dctableLocator as any,
          executables: [],
        }
        // @ts-ignore
        form.change(`configs.${Dctable.buildFqn(dctableLocator)}`, config)
      }
    })
  }
}

Component.displayName = NAME
