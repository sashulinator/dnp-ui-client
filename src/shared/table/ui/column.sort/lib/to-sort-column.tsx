import React from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'

import { type Column } from '../../column/models/column'
import { type Context } from '../models/contex'
import { HeaderCell } from '../widgets/_header-cell'

export function toSortColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    renderHeader: (props) => {
      return (
        <Flex align='center' width='100%' gap='4'>
          {React.createElement(column.renderHeader, props)}
          <HeaderCell {...props} />
        </Flex>
      )
    },
    headerProps: {
      ...column.headerProps,
      style: {
        ...column.headerProps?.style,
        minWidth: '12rem',
        paddingLeft: 'var(--space-1)',
        paddingRight: 'var(--space-1)',
      },
    },
    cellProps: {
      ...column.cellProps,
      style: {
        ...column.cellProps?.style,
        paddingLeft: 'var(--space-3)',
        paddingRight: 'var(--space-1)',
      },
    },
  } satisfies Column<TItem, TContext>
}
