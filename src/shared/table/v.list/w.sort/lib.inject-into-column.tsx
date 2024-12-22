import React from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'

import { type ColumnProps, defaultRenderHeader } from '../ui.list'
import { type Context } from './models.contex'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: ColumnProps<TItem, TContext>,
): ColumnProps<TItem, TContext> {
  return {
    ...column,
    renderHeader: (props) => {
      return (
        <Flex align='center' width='100%' gap='4'>
          {React.createElement(column.renderHeader || defaultRenderHeader, props)}
          <HeaderCell {...props} />
        </Flex>
      )
    },
  } satisfies ColumnProps<TItem, TContext>
}
