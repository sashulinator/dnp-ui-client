import { useMemo, useState } from 'react'

import { APP } from '~/app/constants.app'
import { routes } from '~/app/route'
import { api } from '~/entities/database-container'
import { Executable, ProcessingForm, SLICE } from '~/entities/processing'
import { processingDataApi } from '~/entities/processing-data'
import * as create from '~/entities/processing/api/create'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Container from '~/shared/container'
import Confirm from '~/shared/dialog/ui/confirm'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import { notify } from '~/shared/notification-list-store'
import Section from '~/shared/section'
import { HighlightedText } from '~/shared/text'
import Tooltip from '~/shared/tooltip'
import { createAtom } from '~/utils/store'

export interface Props {
  className?: string | undefined
}

const NAME = `${APP}-${SLICE}-page-Create`

export default function Component(): JSX.Element {
  const [tabValue, setTabValue] = useState<'multi' | 'single'>('multi')
  const modalAtom = useMemo(() => createAtom({ open: false }), [])

  const form = useCreateForm<ProcessingForm.Values>(
    {
      onSubmit: (values) => {
        // eslint-disable-next-line no-console
        // console.log('values', ProcessingForm.fromValues(values))
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
            fetchTables={fetchTables}
            fetchExecutableSchemas={fetchExecutableSchemas}
          />
        </Section>

        {tabValue === 'multi' && (
          <Card asChild>
            <Section size='1'>
              <Flex gap='2' direction='row' justify='end'>
                <Flex gap='2' align='center'>
                  <Tooltip content='Сбросить'>
                    <span>
                      <Button size='1' variant='outline' onClick={() => form.reset()} disabled={!form.getState().dirty}>
                        Сбросить изменения
                      </Button>
                    </span>
                  </Tooltip>
                  <Button
                    loading={createMutator.isLoading}
                    disabled={!form.getState().dirty || form.getState().invalid}
                    onClick={() => modalAtom.set({ open: true })}
                  >
                    Запустить
                  </Button>
                </Flex>
              </Flex>
            </Section>
          </Card>
        )}

        <Confirm
          controller={modalAtom}
          title='Хотите сохранить изменения в файле?'
          onClose={() => {
            modalAtom.set({ open: false })
          }}
          description='Если необходимо выполнить потабличную настройку, пройдите на соответствующую вкладку'
          confirmText='Запустить'
          closeText='Отменить'
          onConfirm={() => {
            form.submit()
            modalAtom.set({ open: false })
          }}
        />
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
    const ret = await api.dcdatabase.findWithTotal.request({})
    return ret.data.items.map((item) => ({ value: item.id, display: item.display }))
  }

  async function fetchTables(dcdatabaseId: string) {
    // TODO: запросить через cache
    const ret = await processingDataApi.initial.findTablesWithTotal.request({ dcdatabaseId })
    return ret.data.items
  }
}

Component.displayName = NAME
