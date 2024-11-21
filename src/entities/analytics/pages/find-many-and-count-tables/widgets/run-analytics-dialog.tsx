import { ScrollArea } from '@radix-ui/themes'

import { useEffect, useMemo } from 'react'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import { api } from '~/entities/analytics/api'
import Button from '~/shared/button'
import { type Controller } from '~/shared/controller'
import Dialog from '~/shared/dialog'
import Flex from '~/shared/flex'
import Form, { type FormApi, useCreateForm } from '~/shared/form'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import { type Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { mergeDeep, setPath } from '~/utils/dictionary'

import DatabaseForm, { type Props as DatabaseFormProps } from '../../../ui/run-form/widgets/database'

type AnalyticsTable = api.findManyAndCountTables.ResponseData['items'][number]

export interface Props {
  dialogController: Controller<boolean>
  analyticalActions: AnalyticalActions[]
  selectedItemsController: Controller<Dictionary<AnalyticsTable>>
}

const NAME = 'workingTable-SelectedItemsDialog'

export default function Component(props: Props): JSX.Element {
  const { dialogController, selectedItemsController, analyticalActions } = props
  const open = dialogController.get()

  const selectedItems = selectedItemsController.get()
  const serviceTree = useMemo(getServiceTree, [open])

  useEffect(() => form.initialize(open ? getInitialValues() : {}), [open])

  useSubscribeUpdate(dialogController.subscribe)
  useSubscribeUpdate(selectedItemsController.subscribe)

  const form = useCreateForm(
    {
      onSubmit: (values) => {
        const ret = {
          services: Object.values(serviceTree.services).map((service) => {
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
        <ScrollArea>
          {open && (
            <_Content
              form={form}
              serviceTree={serviceTree}
              selectedItems={selectedItemsController.get()}
              analyticalActions={analyticalActions}
            />
          )}
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )

  /**
   * private
   */

  function getInitialValues(): Dictionary<AnalyticsTable> {
    const list = Object.values(selectedItems)
    let values = {}
    for (let index = 0; index < list.length; index++) {
      const item = list[index]
      item.columns.forEach((column) => {
        props.analyticalActions.forEach((action) => {
          values = mergeDeep(
            values,
            setPath(
              values,
              [item.serviceId, item.databaseName, item.schemaName, item.name, column.name, action.name],
              true,
            ),
          )
        })
      })
    }

    return values
  }

  function getServiceTree() {
    if (!open) return {} as ServiceTree
    const list = Object.values(selectedItems)
    let values = {}

    for (let index = 0; index < list.length; index++) {
      const item = list[index]
      item.columns.forEach((column) => {
        values = mergeDeep(values, {
          services: {
            [item.serviceId]: {
              id: item.serviceId,
              host: item.serviceHost,
              port: item.servicePort,
              username: item.serviceUsername,
              password: item.servicePassword,
              databases: {
                [item.databaseName]: {
                  name: item.databaseName,
                  display: item.databaseDisplay,
                  schemas: {
                    [item.schemaName]: {
                      name: item.schemaName,
                      display: item.schemaDisplay,
                      tables: {
                        [item.name]: {
                          name: item.name,
                          display: item.display,
                          columns: {
                            [column.name]: {
                              name: column.name,
                              display: column.display,
                              actions: props.analyticalActions,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })
      })
    }

    return values as ServiceTree
  }
}

Component.displayName = NAME

type ServiceTree = {
  services: Record<
    string,
    {
      id: string
      host: string
      port: number
      username: string
      password: string
      databases: Record<
        string,
        {
          name: string
          display: string
          schemas: DatabaseFormProps['schemas']
        }
      >
    }
  >
}

type _ContentProps = {
  selectedItems: Dictionary<AnalyticsTable>
  analyticalActions: AnalyticalActions[]
  form: FormApi
  serviceTree: ServiceTree
}

function _Content(props: _ContentProps): JSX.Element {
  const { serviceTree } = props

  return (
    <Flex width='100%'>
      <Form
        form={props.form}
        render={() => {
          return (
            <Flex width='100%' gap='9' direction='column'>
              {Object.values(serviceTree.services).map((service) => {
                return (
                  <Flex direction='column' gap='8' width='100%' key={service.id}>
                    {Object.values(service.databases || {}).map((database) => {
                      return (
                        <DatabaseForm
                          key={database.name}
                          name={`${service.id}.${database.name}`}
                          display={database.display}
                          schemas={database.schemas}
                        />
                      )
                    })}
                  </Flex>
                )
              })}
            </Flex>
          )
        }}
      />
    </Flex>
  )
}
