import { useMemo } from 'react'

import { SLICE } from './constants'
import { emitBlocksBindings } from './lib.emit-init-blocks-bindings'
import { initBlocksContext } from './lib.init-blocks-context'
import type { BlockComponent, BlocksContext, Schema } from './models'
import { Component as BlockFactory } from './ui.block-factory'

export interface Props {
  schema: Schema
  context: Record<string, unknown>
  componentMap: Record<string, BlockComponent>
}

export const NAME = `${SLICE}-SchemaFactory`

/**
 * ui-ReactFactory'
 */
export default function Component(props: Props): React.ReactNode {
  const { schema, context: ctx, componentMap } = props

  const context = useMemo(() => ({ ...ctx }), [schema])
  useMemo(() => {
    initBlocksContext(schema.block, schema.bindings, context as BlocksContext)
  }, [schema])
  useMemo(() => {
    emitBlocksBindings('onInit', schema.block, schema.bindings, context as BlocksContext, [])
  }, [schema])

  return (
    <BlockFactory
      context={context as BlocksContext}
      componentMap={componentMap}
      block={schema.block}
      bindings={schema.bindings}
    />
  )
}

Component.displayName = NAME
