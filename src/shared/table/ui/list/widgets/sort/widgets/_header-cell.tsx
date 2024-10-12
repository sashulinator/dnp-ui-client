// TODO убрать зависимость от where
import { SortButton } from '~/shared/sort'
import { type Dictionary, assertDefined } from '~/utils/core'
import { add } from '~/utils/dictionary'

import { type RenderHeaderProps } from '../../../../column/models/column'
import { type Context } from '../models/contex'

export function HeaderCell<TItem extends Dictionary, TContext extends Context<TItem>>({
  accessorKey,
  context,
}: RenderHeaderProps<TItem, TContext>): JSX.Element {
  assertDefined(context)
  const sortValue = context?.sort?.[accessorKey] as 'asc'

  return (
    <SortButton
      size='1'
      round={true}
      variant='ghost'
      onChange={(newValue) => {
        /**
         * Если сделать в лоб:
         *  _____________________________________________________
         * |                                                     |
         * |  { [x: string]: Value }                             |
         * |        ~~~~~~~                                      |
         * |  accessorKey: keyof TItem превращается в string     |
         * |______  _____________________________________________|
         *        |/
         * const sortToAdd = { [accessorKey]: toFilter(filterConfig) }
         * */
        const sortToAdd = add({}, accessorKey, newValue)
        context?.setSort?.(sortToAdd)
      }}
      value={sortValue}
    />
  )
}
