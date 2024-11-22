import { ScrollArea, Spinner } from '@radix-ui/themes'

import { useLayoutEffect, useState, useTransition } from 'react'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import { api } from '~/entities/analytics/api'
import { type FlatTable } from '~/entities/database-container'
import Button from '~/shared/button'
import { type Controller } from '~/shared/controller'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import { type Dictionary, assertNotNull } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

import RunForm, { type Tree } from '../../../ui/run-form'

export interface Props {
  dialogController: Controller<boolean>
  analyticalActions: AnalyticalActions[]
  selectedItemsController: Controller<Dictionary<FlatTable>>
}

const NAME = 'workingTable-SelectedItemsDialog'

export default function Component(props: Props): JSX.Element {
  const { dialogController, selectedItemsController, analyticalActions } = props
  const [tree, setTree] = useState<Tree | null>(null)
  const [pending, setTreeTransition] = useTransition()
  const [isInitialValuesPending, setInitialValuesTransition] = useTransition()
  const open = dialogController.get()

  const selectedItems = selectedItemsController.get()
  useLayoutEffect(() => {
    if (!open) return setTree(null)
    setTimeout(() => {
      setTreeTransition(() => {
        setTree(RunForm.buildTree(Object.values(selectedItems), analyticalActions))
      })
    })
  }, [open])

  useLayoutEffect(() => {
    if (!open) return setTree(null)
    setTimeout(() => {
      setInitialValuesTransition(() => {
        form.initialize(open ? RunForm.buildInitialValues(Object.values(selectedItems), analyticalActions) : {})
      })
    })
  }, [open])

  useSubscribeUpdate(dialogController.subscribe)
  useSubscribeUpdate(selectedItemsController.subscribe)

  const form = useCreateForm(
    {
      onSubmit: (values) => {
        assertNotNull(tree)
        const ret = {
          services: Object.values(tree.services).map((service) => {
            return {
              host: service.host,
              port: service.port,
              username: service.username,
              password: service.password,
              databases: Object.values(service.databases).map((database) => {
                return {
                  name: database.name,
                  schemas: Object.values(database.schemas).map((schema) => {
                    return {
                      name: schema.name,
                      tables: Object.values(schema.tables).map((table) => {
                        if (!table.columns) return {}
                        return {
                          name: table.name,
                          columns: Object.values(table.columns).map((column) => {
                            return {
                              name: column.name,
                              actions: analyticalActions
                                .filter((action) => {
                                  // prettier-ignore
                                  return values[service.id][database.name][schema.name][table.name][column.name][action.name]
                                })
                                .map((action) => action.name),
                            }
                          }),
                        }
                      }),
                    }
                  }),
                }
              }),
            }
          }),
        }

        runMutator.mutate(ret as any)
      },
    },
    {
      values: true,
    },
  )

  const runMutator = api.run.useCache({
    onSuccess: () => {
      notify({ title: 'Запущено', type: 'success' })
    },
  })

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth='1224px'>
        <Dialog.Title>
          <Flex align='center' justify='between'>
            Запуск аналитики{' '}
            <Flex align='center' gap='6'>
              <Button loading={runMutator.isLoading} onClick={() => form.submit()}>
                Запустить
              </Button>
              <Button round={true} variant='ghost' onClick={() => dialogController.set(false)}>
                <Icon name='Cross1' />
              </Button>
            </Flex>
          </Flex>
        </Dialog.Title>
        {tree && !pending && !isInitialValuesPending ? (
          <ScrollArea>{open && <Form form={form} tree={tree} component={RunForm} />}</ScrollArea>
        ) : (
          <Spinner />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

Component.displayName = NAME
