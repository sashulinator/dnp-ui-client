import { useState } from 'react'

import { confirm } from '~/app/controller'
import { routes } from '~/app/route'
import { Procedure, ProcessingForm } from '~/entities/processing'
import * as create from '~/entities/processing/api/create'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import Heading from '~/shared/heading'
import Section from '~/shared/section'
import { HighlightedText } from '~/shared/text'
import { type Dictionary, generateId } from '~/utils/core'
import { notifyError, notifySuccess } from '~notification'

export interface Props {
  className?: string | undefined
}

const NAME = `page-createProcessing`

export default function Component(): JSX.Element {
  const [tabValue, setTabValue] = useState<'multi' | 'single'>('multi')

  const form = useCreateForm<ProcessingForm.Values>(
    {
      onSubmit: (values) => {
        moveFlatContentUp(values)
        // eslint-disable-next-line no-console
        createMutator.mutate({ data: { processing: ProcessingForm.fromValues(values) } })
      },
      initialValues: {
        name: generateId(),
      },
    },
    { values: true, initialValues: true },
  )

  const values = form.getState().values

  const createMutator = create.useCache({
    onSuccess: () => {
      notifySuccess({ title: 'Создано', type: 'success' })
    },
    onError: (error) => notifyError({ type: 'error', error: error }),
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
            fetchProcedures={fetchExecutableSchemas}
            localStoragePrefix={NAME}
          />
        </Section>

        {tabValue === 'multi' && (
          <Section size='1'>
            <Flex gap='2' align='center' justify='end'>
              <Button
                loading={createMutator.isLoading}
                onClick={() => {
                  confirm({
                    title: 'Сохранить обработку?',
                    description: 'Если необходимо выполнить потабличную настройку, пройдите на соответствующую вкладку',
                    onConfirm: () => void form.submit(),
                  })
                }}
              >
                Сохранить
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
    const ret = await Procedure.api.findWithTotal.request({})
    return ret.data.items
  }
}

Component.displayName = NAME

/**
 * Поднимает обьект с ключом %flat% на уровень выше
 * дано  { "a" : { "%flat%" : { "b": "b", "c":"c"}}}
 * Результат: { "a": { "b": "b", "c": "c" } }
 */
function moveFlatContentUp(obj: Dictionary) {
  //@ts-ignore
  function traverseAndMove(currentObj) {
    if (currentObj && currentObj['%flat%']) {
      const flatContent = currentObj['%flat%']
      delete currentObj['%flat%']
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
