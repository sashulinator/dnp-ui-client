import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { Viewer, ViewerProps } from '~/entities/explorer'
import { OperationalTable, Row } from '~/entities/operational-table'
import { notify } from '~/shared/notification-list-store'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import Icon from '~/ui/icon'
import Spinner from '~/ui/spinner'
import { TableListColumn } from '~/ui/table'
import { Id, c } from '~/utils/core'

export interface Props extends Omit<ViewerProps, 'children'> {
  columns: TableListColumn<Record<string, unknown>>[] | undefined
  remove: (id: Id) => Promise<OperationalTable>
  update: (row: Row) => Promise<OperationalTable>
}

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

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [approved, setApproved] = useState(row._status === '1')

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const updateMutator = useMutation([`${NAME}.update`], update, {
          onSuccess: () => {
            setApproved((s) => !s)
          },
        })

        return (
          <Flex height='100%' width='100%' align='center' justify='end'>
            {updateMutator.isLoading ? (
              <Spinner />
            ) : (
              <Button
                size={'1'}
                color={approved ? 'green' : 'red'}
                onClick={(e) => {
                  e.stopPropagation()
                  updateMutator.mutate({ ...row, _status: approved ? '0' : '1' })
                }}
              >
                {approved ? 'Согласован' : 'Не согласован'}
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

    return cloned
  }, [columns])

  return (
    <Viewer.Root {...rootProps} className={c(props.className, NAME)}>
      <Viewer.Table columns={operationalTableColumns} />
    </Viewer.Root>
  )
}

Component.displayName = NAME
