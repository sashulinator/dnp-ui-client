import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { Viewer } from '~/entities/explorer'
import { TableColumn } from '~/entities/explorer/ui/viewer'
import { OperationalTable, Row } from '~/entities/operational-table'
import { getRole, roles } from '~/entities/user'
import { notify } from '~/shared/notification-list-store'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import Icon from '~/ui/icon'
import Spinner from '~/ui/spinner'
import { SortingButton } from '~/ui/table'
import { Id, SetterOrUpdater, c } from '~/utils/core'

type Context = {
  requestParams?: { sort: Record<string, 'asc' | 'desc'> } | undefined
  setRequestParams: SetterOrUpdater<{ sort: Record<string, 'asc' | 'desc'> }>
}

export interface Props extends Omit<Viewer.ViewerProps, 'children'> {
  columns: TableColumn<Record<string, unknown>>[] | undefined
  context: Context | undefined
  remove: (id: Id) => Promise<OperationalTable>
  update: (row: Row) => Promise<Row>
}

const statusStringMap = {
  '0': 'В работе',
  '1': 'На согласовании',
  '2': 'Согласовано',
  '3': 'Отменено',
  '4': 'Целевые данные',
}

const statusChangeMap = {
  [roles.Approver]: {
    '1': '2',
    '2': '3',
    '3': '2',
  },
  [roles.Admin]: {
    '2': '3',
    '3': '2',
  },
  [roles.Operator]: {
    '0': '1',
    '1': '0',
    '3': '0',
  },
} as const

const statusColorMap = {
  '0': 'gray',
  '1': 'yellow',
  '2': 'green',
  '3': 'red',
  '4': 'blue',
} as const

export const NAME = 'operationlTable-ExplorerViewer'

/**
 * operationlTable-ExplorerViewer
 */
export default function Component(props: Props): JSX.Element {
  const { columns = [], update, remove, ...rootProps } = props

  const operationalTableColumns = useMemo(() => {
    const cloned = [...columns]

    cloned.push({
      key: '_status',
      renderHeader: () => 'Согласование',
      cellProps: { align: 'right' },
      headerProps: { align: 'right' },
      renderCell: ({ item }) => {
        const row = item.data as Row
        const role = getRole()

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [status, setStatus] = useState(row._status)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const updateMutator = useMutation([`${NAME}.update`], update, {
          onSuccess: (_, variables) => {
            setStatus(variables._status)
          },
        })

        return (
          <Flex height='100%' width='100%' align='center' justify='end'>
            {updateMutator.isLoading ? (
              <Spinner />
            ) : (
              <Button
                size={'1'}
                color={statusColorMap[status as '0']}
                onClick={(e) => {
                  e.stopPropagation()
                  updateMutator.mutate({ ...row, _status: statusChangeMap[role as 'Approver'][status as '2'] as '0' })
                }}
              >
                {statusStringMap[status as '0']}
              </Button>
            )}
          </Flex>
        )
      },
    })
    cloned.push({
      key: 'action',
      renderHeader: () => 'Действия',
      cellProps: { width: '1rem', align: 'right' },
      headerProps: { align: 'right' },
      renderCell: ({ item }) => {
        const row = item.data as Row

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const removeMutator = useMutation([`${NAME}.remove`], remove, {
          onSuccess: () => {
            notify({ title: 'Удалено', type: 'success' })
          },
          onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
        })

        return (
          <Button
            round={true}
            color='red'
            onClick={(e) => {
              e.stopPropagation()
              removeMutator.mutate(row._id)
            }}
          >
            <Icon name='Trash' />
          </Button>
        )
      },
    })

    cloned.unshift({
      key: '_id',
      renderHeader: ({ context }) => {
        return (
          <Flex gap='2' align='center'>
            _id
            <SortingButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(value) =>
                context?.setRequestParams?.((s) => ({
                  ...s,
                  sort: { ...s.sort, _id: value },
                }))
              }
              value={context?.requestParams?.sort['_id']}
            />
          </Flex>
        )
      },
      cellProps: { width: '1rem', align: 'center' },
      headerProps: { align: 'center' },
      renderCell: ({ item }) => {
        const row = item.data as Row

        return row._id
      },
    })

    return cloned
  }, [columns])

  return (
    <Viewer.Root {...rootProps} className={c(props.className, NAME)}>
      <Viewer.Table columns={operationalTableColumns} />
    </Viewer.Root>
  )
}

Component.displayName = NAME
