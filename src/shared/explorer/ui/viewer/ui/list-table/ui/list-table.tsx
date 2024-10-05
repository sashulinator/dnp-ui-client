import { ListTable, type ListTableTypes } from '~/shared/table'
import { type Dictionary, c } from '~/utils/core'

import { type Item } from '../../../../../models/explorer'
import { useContext } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../root'

export type Column<TItem extends Item, TContext extends Dictionary> = ListTableTypes.Column<TItem, TContext>

export type RenderHeaderProps<TItem extends Item, TContext extends Dictionary> = ListTableTypes.RenderHeaderProps<
  TItem,
  TContext
>

export type RenderCellProps<TItem extends Item, TContext extends Dictionary> = ListTableTypes.RenderCellProps<
  TItem,
  TContext
>

export type Props<TItem extends Item, TContext extends Dictionary> = Omit<
  ListTableTypes.ListProps<TItem, TContext>,
  'list'
>

export const NAME = `${ROOT_NAME}-c-Table`

export default function Component<TItem extends Item, TContext extends Dictionary>(
  props: Props<TItem, TContext>,
): JSX.Element {
  const { ...listTableProps } = props

  const { data } = useContext<TItem>()

  return <ListTable {...listTableProps} list={data?.items || []} className={c(props.className, NAME)} />
}

Component.displayName = NAME
