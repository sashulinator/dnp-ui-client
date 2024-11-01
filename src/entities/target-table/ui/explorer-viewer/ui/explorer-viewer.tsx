import { useMemo } from 'react'
import { useMutation } from 'react-query'

import { type Row, type TargetTable } from '~/entities/target-table'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import { type ColumnContext } from '~/slices/database'
import { type Item, Viewer } from '~/slices/explorer'
import { type TableColumn } from '~/slices/explorer/ui/viewer'
import { SortButton } from '~/slices/sort'
import { type Id, c } from '~/utils/core'

export interface Props<TItem extends Item> extends Omit<Viewer.RootProps<TItem>, 'children'> {
  columns: TableColumn<Record<string, unknown>, ColumnContext>[] | undefined
  context: ColumnContext | undefined
  remove: (id: Id) => Promise<TargetTable>
  update: (row: Row) => Promise<Row>
}

export const NAME = 'targetTable-ExplorerViewer'

/**
 * targetTable-ExplorerViewer
 */
export default function Component<TItem extends Item>(props: Props<TItem>): JSX.Element {
  const { columns = [], remove, ...rootProps } = props

  const targetTableColumns = useMemo(() => {
    const cloned = [...columns]

    cloned.push({
      accessorKey: 'action',
      name: 'Действия',
      renderHeader: ({ name }) => name,
      cellProps: {
        style: {
          textAlign: 'right',
          // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
          padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
          verticalAlign: 'middle',
        },
      },
      headerProps: { style: { textAlign: 'right', verticalAlign: 'middle' } },
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
      accessorKey: '_id',
      name: 'Системный ID',
      renderHeader: ({ context }) => {
        return (
          <Flex height='100%' align='center' justify='center'>
            <SortButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(value) => context?.setSort?.({ _id: value })}
              value={context?.sort?._id}
            />
          </Flex>
        )
      },
      cellProps: { width: '1rem', align: 'center' },
      headerProps: { align: 'center', justify: 'center' },
      renderCell: ({ item }) => {
        const row = item.data as Row

        return row._id
      },
    })

    return cloned
  }, [columns])

  return (
    <Viewer.Root {...rootProps} className={c(props.className, NAME)}>
      <Viewer.Table columns={targetTableColumns} />
    </Viewer.Root>
  )
}

Component.displayName = NAME
