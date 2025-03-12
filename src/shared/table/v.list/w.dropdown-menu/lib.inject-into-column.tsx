import { createElement } from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'
import { toHtml } from '~/utils/md'

import { type ColumnProps } from '..'
import { type Context } from './type.contex'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context>(
  column: ColumnProps<TItem, TContext>,
): ColumnProps<TItem, TContext> {
  return {
    ...column,
    renderHeader: (props) => {
      return (
        <Flex align='center' width='100%' gap='4'>
          {createElement(column.renderHeader || defaultRenderHeader, props)}
          <HeaderCell {...props} />
        </Flex>
      )
    },
  } satisfies ColumnProps<TItem, TContext>
}

export function defaultRenderHeader(params: { name: string | number | symbol; display?: string | undefined }) {
  return params.display ? toHtml(params.display) : String(params.name)
}
