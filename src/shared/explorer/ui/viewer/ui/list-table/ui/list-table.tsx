import { deserializeItem } from '~dnp/shared/explorer/lib/deserialize-item'
import { type ColumnTypes, ListTable, type ListTableTypes } from '~dnp/shared/table'
import { type Dictionary, c, fns } from '~dnp/utils/core'

import { type Item } from '../../../../../models/explorer'
import { useContext } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../root'

export type Column<TItem extends Dictionary, TContext extends Dictionary> = ColumnTypes.Column<TItem, TContext>

export type RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> = ColumnTypes.RenderHeaderProps<
  TItem,
  TContext
>

export type RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> = ColumnTypes.RenderCellProps<
  TItem,
  TContext
>

export type Props<TItem extends Dictionary, TContext extends Dictionary> = Omit<
  ListTableTypes.ListProps<TItem, TContext>,
  'list' | 'error' | 'loading'
>

export const NAME = `${ROOT_NAME}-c-Table`

export default function Component<TItem extends Item, TContext extends Dictionary>(
  props: Props<TItem['data'], TContext>,
): JSX.Element {
  const { getRowProps, ...listTableProps } = props

  const { explorer, onPathChange, paths = [] } = useContext<TItem>()

  const items = explorer?.items || []
  const deserializedItemList = items.map(deserializeItem)

  return (
    <ListTable<TItem['data'], TContext>
      {...listTableProps}
      className={c(props.className, NAME)}
      list={deserializedItemList}
      getRowProps={(params) => {
        const rowProps = getRowProps?.(params)
        return {
          key: (params.item as Dictionary<string>)[explorer?.idKey || ''],
          ...rowProps,
          onDoubleClick: fns(rowProps?.onDoubleClick, () => {
            const pathtoAdd = {
              name: (params.item as Dictionary<string>)[explorer?.idKey || ''],
              type: 'row',
            } as const
            onPathChange?.([...paths, pathtoAdd], { data: params.item, type: 'row' } as TItem /* instance */)
          }),
        }
      }}
    />
  )
}

Component.displayName = NAME
