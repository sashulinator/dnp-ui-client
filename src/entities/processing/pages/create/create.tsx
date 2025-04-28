import { useState } from 'react'

import { APP } from '~/app/constants.app'
import { confirm } from '~/app/controller'
import { routes } from '~/app/route'
import { Dcdatabase } from '~/entities/database-container'
import { Executable, ProcessingForm, SLICE } from '~/entities/processing'
import * as create from '~/entities/processing/api/create'
import { processingDataApi } from '~/entities/workshop'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import Section from '~/shared/section'
import { HighlightedText } from '~/shared/text'
import { type Dictionary } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

const NAME = `${APP}-${SLICE}-page-Create`

export default function Component(): JSX.Element {
  const [tabValue, setTabValue] = useState<'multi' | 'single'>('multi')

  const form = useCreateForm<ProcessingForm.Values>(
    {
      onSubmit: (values) => {
        moveFlatContentUp(values)
        // eslint-disable-next-line no-console
        createMutator.mutate({ data: { processing: ProcessingForm.fromValues(values) } })
      },
      // validate: (values) => {
      //   // eslint-disable-next-line no-console
      //   console.log(values)
      //   return undefined
      //   // const processingCreateInput = ProcessingForm.fromValues(values)
      //   // const { issues } = safeParse(createNormalizationConfigSchema, processingCreateInput)
      //   // return toNestedErrors(issues)
      // },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const createMutator = create.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  return (
    <main className={NAME}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Heading>
            {routes.processing_create.getName()}{' '}
            {values.name && <HighlightedText tooltipContent='Название'>{values.name}</HighlightedText>}
          </Heading>
        </Section>

        <Section size='1'>
          <Form
            tabValue={tabValue}
            setTabValue={setTabValue}
            form={form}
            component={ProcessingForm.default}
            fetchDcdatabaseOptions={fetchDatabaseOptions}
            fetchTablesByDcdatabaseId={fetchTables}
            fetchExecutableSchemas={fetchExecutableSchemas}
          />
        </Section>

        {tabValue === 'multi' && (
          <Section size='1'>
            <Flex gap='2' align='center' justify='end'>
              <Button
                loading={createMutator.isLoading}
                onClick={() => {
                  confirm({
                    title: 'Запустить обработку?',
                    description: 'Если необходимо выполнить потабличную настройку, пройдите на соответствующую вкладку',
                    onConfirm: () => void form.submit(),
                  })
                }}
              >
                Запустить
              </Button>
            </Flex>
          </Section>
        )}
      </Container>
    </main>
  )

  /**
   * private
   */

  async function fetchExecutableSchemas() {
    const ret = await Executable.api.findWithTotal.request({})
    return ret.data.items
  }

  async function fetchDatabaseOptions() {
    const ret = await Dcdatabase.api.findWithTotal.request({})
    return ret.data.items.map((item) => ({ value: item.id, display: item.display }))
  }

  async function fetchTables(dcdatabaseId: string) {
    // TODO: запросить через cache
    const ret = await processingDataApi.initial.findTablesWithTotal.request({ dcdatabaseId })
    return ret.data.items
  }
}

Component.displayName = NAME

/**
 * Поднимает обьект с ключом <flat> на уровень выше
 * дано  { "a" : { "<flat>" : { "b": "b", "c":"c"}}}
 * Результат: { "a": { "b": "b", "c": "c" } }
 */
function moveFlatContentUp(obj: Dictionary) {
  //@ts-ignore
  function traverseAndMove(currentObj) {
    if (currentObj && currentObj['<flat>']) {
      const flatContent = currentObj['<flat>']
      delete currentObj['<flat>']
      for (const key in flatContent) {
        // eslint-disable-next-line no-prototype-builtins
        if (flatContent.hasOwnProperty(key)) {
          currentObj[key] = flatContent[key]
        }
      }
    }
    for (const key in currentObj) {
      // eslint-disable-next-line no-prototype-builtins
      if (currentObj.hasOwnProperty(key)) {
        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          traverseAndMove(currentObj[key])
        } else if (Array.isArray(currentObj[key])) {
          // @ts-ignore
          currentObj[key].forEach((item) => {
            if (typeof item === 'object' && item !== null) {
              traverseAndMove(item)
            }
          })
        }
      }
    }
  }
  traverseAndMove(obj)
  return obj
}
