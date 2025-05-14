import React from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'

import { defaultRenderHeaderCell } from '../lib.default-render-header-cell'
import { type Column, type RenderHeaderCellProps } from '../types'
import { type Context } from './models.contex'
import { HeaderCell } from './w._header-cell'

const ORIGINAL_RENDER_HEADER_CELL = 'sort_renderHeaderCell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context<TItem>>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  // @ts-ignore
  if (column.sortable === false) return column

  return {
    ...column,
    // @ts-ignore
    [ORIGINAL_RENDER_HEADER_CELL]: column.renderHeaderCell as any,
    renderHeaderCell: RenderHeaderCell as any,
  } satisfies Column<TItem, TContext>
}

function RenderHeaderCell(props: RenderHeaderCellProps<Dictionary, Context<Dictionary>>) {
  return (
    <Flex align='center' width='100%' gap='4'>
      {/* @ts-ignore */}
      {React.createElement(props.column[ORIGINAL_RENDER_HEADER_CELL] || defaultRenderHeaderCell, props)}
      <HeaderCell {...props} />
    </Flex>
  )
}
