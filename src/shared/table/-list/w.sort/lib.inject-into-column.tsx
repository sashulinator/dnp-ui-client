import React from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'

import { defaultRenderHeaderCell } from '../lib.default-render-header-cell'
import { type Column } from '../types'
import { type Context } from './models.contex'
import { HeaderCell } from './w._header-cell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    renderHeaderCell: (props) => {
      return (
        <Flex align='center' width='100%' gap='4'>
          {React.createElement(column.renderHeaderCell || defaultRenderHeaderCell, props)}
          <HeaderCell {...props} />
        </Flex>
      )
    },
  } satisfies Column<TItem, TContext>
}
