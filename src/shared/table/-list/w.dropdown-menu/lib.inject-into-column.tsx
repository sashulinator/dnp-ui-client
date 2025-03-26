import { createElement } from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'
import { toHtml } from '~/utils/md'

import { type Column } from '..'
import { type Context } from './type.contex'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    renderHeaderCell: (props) => {
      return (
        <Flex align='center' width='100%' gap='4'>
          {createElement(column.renderHeaderCell || defaultRenderHeader, props)}
          <HeaderCell {...props} />
        </Flex>
      )
    },
  } satisfies Column<TItem, TContext>
}

export function defaultRenderHeader(params: { name: string | number | symbol; display?: string | undefined }) {
  return params.display ? toHtml(params.display) : String(params.name)
}
