import { createElement } from 'react'

import Flex from '~/shared/flex'
import { type Dictionary } from '~/utils/core'
import { toHtml } from '~/utils/md'

import { type Column } from '..'
import type { RenderHeaderCellProps } from '../types'
import { type Context } from './type.contex'
import { HeaderCell } from './w._header-cell'

const ORIGINAL_RENDER_HEADER_CELL = 'dropdownMenu_renderHeaderCell'

export function injectIntoColumn<TItem extends Dictionary, TContext extends Context>(
  column: Column<TItem, TContext>,
): Column<TItem, TContext> {
  return {
    ...column,
    // @ts-ignore
    [ORIGINAL_RENDER_HEADER_CELL]: column.renderHeaderCell as any,
    renderHeaderCell: RenderHeaderCell as any,
  } satisfies Column<TItem, TContext>
}

export function defaultRenderHeader(params: { name: string | number | symbol; display?: string | undefined }) {
  return params.display ? toHtml(params.display) : String(params.name)
}

function RenderHeaderCell(props: RenderHeaderCellProps<Dictionary, Context>) {
  return (
    <Flex align='center' width='100%' gap='4'>
      {/* @ts-ignore */}
      {createElement(props.column[ORIGINAL_RENDER_HEADER_CELL] || defaultRenderHeader, props)}
      <HeaderCell {...props} />
    </Flex>
  )
}
