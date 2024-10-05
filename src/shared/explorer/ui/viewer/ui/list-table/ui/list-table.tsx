import { deserializeItem } from '~/shared/explorer/lib/deserialize-item'
import { ListTable, type ListTableTypes } from '~/shared/table'
import { type Dictionary, c, fns } from '~/utils/core'

import { type Item } from '../../../../../models/explorer'
import { useContext } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../root'

export type Column<TItem extends Dictionary, TContext extends Dictionary> = ListTableTypes.Column<TItem, TContext>

export type RenderHeaderProps<TItem extends Dictionary, TContext extends Dictionary> = ListTableTypes.RenderHeaderProps<
  TItem,
  TContext
>

export type RenderCellProps<TItem extends Dictionary, TContext extends Dictionary> = ListTableTypes.RenderCellProps<
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
  const { rowProps, ...listTableProps } = props

  const { explorer, onPathChange, loading, error, paths = [] } = useContext<TItem>()

  const items = explorer?.items || []
  const deserializedItemList = items.map(deserializeItem)

  return (
    <ListTable<TItem['data'], TContext>
      {...listTableProps}
      loading={loading}
      error={error}
      rowProps={(params) => {
        const rowPropsFromProps = rowProps?.(params)
        return {
          key: (params.item as Dictionary<string>)[explorer?.idKey || ''],
          ...rowPropsFromProps,
          onDoubleClick: fns(rowPropsFromProps?.onDoubleClick, () => {
            const pathtoAdd = {
              name: (params.item as Dictionary<string>)[explorer?.idKey || ''],
              type: 'row',
            } as const
            onPathChange?.([...paths, pathtoAdd], { data: params.item, type: 'row' } as TItem /* instance */)
          }),
        }
      }}
      list={deserializedItemList}
      className={c(props.className, NAME)}
    />
  )
}

Component.displayName = NAME
