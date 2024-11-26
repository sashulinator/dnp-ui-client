import { useLayoutEffect, useState, useTransition } from 'react'

import { type Action } from '~/common/entities/analytics'
import { analytics } from '~/entities/analytics/api.v1'
import { type FlatTable } from '~/entities/database-container'
import Button from '~/shared/button'
import { type Controller } from '~/shared/controller'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import ScrollArea from '~/shared/scroll-area'
import Spinner from '~/shared/spinner'
import { type Dictionary, assertDefined, assertNotNull } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { setPath } from '~/utils/dictionary'

import RunForm, { type Tree } from '../../../analytics/ui/run-form'

export interface Props {
  dialogController: Controller<boolean>
  analyticalActions: Action[]
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
        const list = Object.values(selectedItems).filter((item) => item.columns !== null)

        let idTree = {} as Record<string, Record<string, Record<string, Record<string, Record<string, Action>>>>>
        list.forEach((item) => {
          item.columns?.forEach((column) => {
            idTree = setPath(
              idTree,
              [item.serviceId, item.databaseId, item.schemaId, item.id, column.id],
              analyticalActions,
            )
          })
        })

        assertNotNull(tree)
        const ret = {
          services: Object.entries(idTree).map(([serviceId, databases]) => {
            const service = tree.services[serviceId]
            return {
              host: service.host,
              port: service.port,
              username: service.username,
              password: service.password,
              databases: Object.entries(databases).map(([databaseId, schemas]) => {
                const database = service.databases[databaseId]

                return {
                  name: database.name,
                  schemas: Object.entries(schemas).map(([schemaId, tables]) => {
                    const schema = database.schemas[schemaId]
                    return {
                      name: schema.name,
                      tables: Object.entries(tables).map(([tableId, columns]) => {
                        const table = schema.tables[tableId]
                        return {
                          name: table.name,
                          columns: Object.entries(columns).map(([columnId]) => {
                            assertDefined(table.columns)
                            const column = table.columns[columnId]
                            return {
                              name: column.name,
                              actions: analyticalActions
                                .filter((action) => {
                                  // prettier-ignore
                                  return values[service.id][database.id][schema.id][table.id][column.id][`_${action.id}`]
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

  const runMutator = analytics.run.useCache({
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
