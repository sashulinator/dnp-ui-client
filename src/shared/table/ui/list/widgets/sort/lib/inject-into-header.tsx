import React from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'

import { type Column } from '../../../../column/models/column'
import { type Context } from '../models/contex'
import { HeaderCell } from '../widgets/_header-cell'

export function injectIntoHeader<TItem extends Dictionary, TContext extends Context<TItem>>(
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
  } satisfies Column<TItem, TContext>
}
