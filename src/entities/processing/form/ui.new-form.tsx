import { useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { APP } from '~/app/constants.app'
import { type Dcdatabase, Dcservice, Dctable } from '~/entities/database-container'
import Button, { DangerButton } from '~/shared/button'
import Flex from '~/shared/flex'
import { Card, Column, FieldArray, Row, getIn, useForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { LabeledSelect, type Option } from '~/shared/select'
import { Tabs } from '~/shared/tabs'
import { type Any, type Dictionary, type SetterOrUpdater, assertDefined, c, generateId, invariant } from '~/utils/core'
import { useLocalStorage } from '~/utils/core-hooks'
import { emptyFn } from '~/utils/function'
import { remove } from '~/utils/list'
import { Params, useStringStorage } from '~/utils/string-storage'

import { SLICE } from '../constants'
import type { Procedure } from '../executable'
import ParamsFieldFactory from '../executable/w.field-factory'
import ExectableForm from '../executable/w.form/ui.form'
// import { type Procedure } from '../../w.procedure'
import InputBlock, { type TableLocator } from './w.input-block'
import OutputBlock from './w.output-block'

export { type Option }

type Executable = {
  name: string
  params?: Record<string, unknown> | undefined
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Config = {
  inputDctableLocator: Dctable.DctableLocator
  executables: Executable[]
}

export type Values = {
  name: string
  outputDcdatabaseId: string
  outputTable: string
  configs: Record<string, Config>
  commonConfig: Config
}

type Column = { name: string; display: string; type: string }
type Table = { name: string; display: string; columns: Column[] }

export interface Props {
  className?: string | undefined
  tabValue: 'multi' | 'single'
  localStoragePrefix: string
  fetchTablesByDcdatabaseId: (dcdatabaseId: string) => Promise<Table[]>
  fetchDcdatabaseOptions: () => Promise<Option[]>
  fetchExecutableSchemas: () => Promise<Procedure[]>
  setTabValue: SetterOrUpdater<'multi' | 'single'>
}

export const NAME = `${APP}-${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const {
    fetchTablesByDcdatabaseId,
    localStoragePrefix,
    fetchDcdatabaseOptions,
    fetchExecutableSchemas,
    tabValue,
    setTabValue,
  } = props

  const [selectedDctableLocator, setSelectedSingleDctableLocator] = useState<Dctable.DctableLocator>()
  const [isTextInput, setIsTextInput] = useState(false)

  const [dcservice, setDcservice] = useStringStorage<Dcservice.DcserviceDisplayWithId>(
    useLocalStorage({ key: `${localStoragePrefix}-dcservice` }),
    new Params.ObjectParam(),
  )

  const [database, setDatabase] = useStringStorage<Dcdatabase.DatabaseValue>(
    useLocalStorage({ key: `${localStoragePrefix}-dcdatabase` }),
    new Params.ObjectParam(),
  )

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
                  dcdatabase={database}
                  setDcdatabase={setDatabase}
                  dcservice={dcservice}
                  setDcserviceValue={setDcservice}
                  disabled={!!form.getState().values?.commonConfig?.executables?.length}
                  onInputChange={manageConfigs}
                  fetchTableList={async ({ sort, dcserviceId, searchFilter, database, page, limit }) => {
                    const ret = await Dcservice.api.findTables.request({
                      dcdatabaseLocator: {
                        dcserviceId,
                        name: database,
                      },
                      sort,
                      where: searchFilter as Any,
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
                  <FieldArray name='commonConfig.executables'>
                    {({ fields }) => (
                      <Flex direction='column' gap='4'>
                        {fields.map((formName, index) => (
                          <Card label='Процедура' key={index}>
                            <Flex width='100%' direction='column' gap='4'>
                              <Row justify='between'>
                                <Column width='50%'>
                                  <ExectableForm
                                    key={index}
                                    onNameChange={(name) => changeExecutableName(name, formName as keyof Values)}
                                    name={formName}
                                    executableSchemas={executableSchemas}
                                  />
                                </Column>
                                <DangerButton
                                  variant='soft'
                                  round={true}
                                  onClick={() => {
                                    removeExecutable(index)
                                  }}
                                >
                                  <Icon name='Trash' />
                                </DangerButton>
                              </Row>
                              <ParamsFieldFactory
                                name={formName}
                                columns={[]}
                                isSingleMode={false}
                                setUniqValues={setUniquePath as Any}
                                setMultyValue={setCommonAndUniquePaths as Any}
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
                                      onNameChange={(name) => changeExecutableName(name, formName as keyof Values)}
                                      name={formName}
                                      executableSchemas={executableSchemas}
                                    />
                                  </Column>
                                  <Column width='50%' />
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

  function removeExecutable(index: number) {
    //
    const state = form.getState().values
    const executablePath = `commonConfig.executables` as keyof Values
    form.change(executablePath, remove(index, state.commonConfig.executables) as Any)

    Object.values(form.getState().values.configs || {}).forEach((config) => {
      setConfigByCommonPath(
        executablePath,
        remove(index, state.commonConfig.executables) as Any,
        config.inputDctableLocator,
      )
    })
  }

  function setCommonAndUniquePaths<T extends keyof Values>(value: Values[T], path: T) {
    form.change(path, value)

    Object.values(form.getState().values.configs || {}).forEach((config) => {
      setConfigByCommonPath(path, value as Values[T], config.inputDctableLocator)
    })
  }

  function setConfigByCommonPath<T extends keyof Values>(
    path: T,
    value: Values[T],
    dctableLocator: Dctable.DctableLocator,
  ) {
    // Проверяем что path начинается с commonConfig
    invariant(/^commonConfig/.test(path), `Пришедшее значение 'path'='${path}' не начинается с 'commonConfig'`)
    const fqn = Dctable.buildFqn(dctableLocator)
    const configPath = path.replace('commonConfig', `configs.${fqn}`)
    if (/%flat%$/.test(path)) {
      const state = getIn(form.getState().values, configPath)
      form.change(configPath as keyof Values, { ...state, ...(value as any) })
    } else {
      form.change(configPath as keyof Values, value)
    }
  }

  function setUniquePath<T extends keyof Values>(getValue: (currentValue: unknown) => unknown, path: T) {
    Object.values(form.getState().values.configs || {}).forEach((config) => {
      const table = inputTablesMeta.current.get(Dctable.buildFqn(config.inputDctableLocator))

      const uniqValue = getValue({
        values: form.getState().values,
        generateId,
        columns: table?.columns,
        table,
      })

      setConfigByCommonPath(path, uniqValue as Values[T], config.inputDctableLocator)
    })
  }

  function getInitialExecutableCommonValues(executableSchema: Procedure) {
    // Получаем initialValue для неуникальных параметров
    const initialValues = executableSchema?.params?.reduce<Record<string, unknown>>((acc, paramSchema) => {
      if (paramSchema.unique) {
        acc[paramSchema.name] = undefined
        return acc
      }

      acc[paramSchema.name] = new Function('context', paramSchema.getInitialValue || '')({
        values: form.getState().values,
        paramSchema,
        formState: form.getState().values,
        generateId,
      })
      return acc
    }, {})

    return initialValues
  }

  function getInitialExecutableUniqueValues(executableSchema: Procedure, config: Config) {
    // TODO избавиться от костыля
    // Находим tableMeta
    const fqn = Dctable.buildFqn(config.inputDctableLocator)
    const dctableMeta = inputTablesMeta.current.get(fqn)
    assertDefined(dctableMeta, `DctableMeta c fqn '${fqn}' не найдена`)

    // Получаем initialValue для НЕуникальных параметров
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

    return uniqInitialValues
  }

  function changeExecutableName<T extends keyof Values>(name: string, path: T /** commonConfig.executables[number] */) {
    // Находим ExecutableSchema с именем @param name
    const executableSchema = executableSchemas?.find((executableSchema) => executableSchema.name === name)
    assertDefined(executableSchema, `ExecutableSchema c именем '${name}' не найдена`)

    // Находим initial значения для НЕуникальных параметров
    const initialExecutableCommonValues = getInitialExecutableCommonValues(executableSchema)

    // Eстанавливаем НЕуникальные параметры в commonConfig
    form.change(path as keyof Values, { name, params: initialExecutableCommonValues } as Any)

    Object.values(form.getState().values.configs || {}).forEach((config) => {
      // Находим initial значения для уникальных параметров
      const initialExecutableUniqueValues = getInitialExecutableUniqueValues(executableSchema, config)

      // Eстанавливаем уникальные параметры в сonfigs
      setConfigByCommonPath(
        path,
        { name, params: { ...initialExecutableCommonValues, ...initialExecutableUniqueValues } } as Any,
        config.inputDctableLocator,
      )
    })
  }

  /**
   * Менеджерит конфиги в форме на основании выбраных/убранных tableLocators
   * @param {Dictionary<TableLocator>} tableLocators словарь локаторов выбранных пользователем
   */
  function manageConfigs(tableLocators: Dictionary<TableLocator> | undefined) {
    const formState = form.getState()
    const tableLocatorsList = Object.values(tableLocators || {})
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

      if (!formState.values.commonConfig) {
        const config: Config = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
