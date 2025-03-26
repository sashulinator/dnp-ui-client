// TODO убрать зависимость от where
import { SortButton } from '~/slices/sort'
import { type Dictionary, assertDefined } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'
import { add } from '~/utils/dictionary'

import { type RenderHeaderCellProps } from '../types'
import { type Context } from './models.contex'

export function HeaderCell<TItem extends Dictionary, TContext extends Context<TItem>>({
  name: accessorKey,
  context,
}: RenderHeaderCellProps<TItem, TContext>): JSX.Element {
  useSubscribeUpdate(subscribes)

  assertDefined(context)
  const sortValue = context?.sortAtom.get()?.[accessorKey] as 'asc'

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
        context?.sortAtom.set?.(sortToAdd)
      }}
      value={sortValue}
    />
  )

  /**
   * private
   */

  function subscribes(update: () => void) {
    const unsubscribe = context?.sortAtom.subscribe((prevState, nextState) => {
      if (prevState?.[accessorKey] !== nextState?.[accessorKey]) update()
    })
    return [unsubscribe]
  }
}
