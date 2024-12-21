import { emitBinding } from './lib.emit-binding'
import type { Binding, BlockNode, BlocksContext } from './models'

export function emitInitBlocksBindings(block: BlockNode, bindings: Binding[] | undefined, context: BlocksContext) {
  if (typeof block === 'string') return

  bindings?.forEach((binding) => {
    emitBinding(binding, 'onBlockInit', block, { ...context, ...context.blocksProps[block.id] })
  })

  if (block.children) block.children.forEach((child) => emitInitBlocksBindings(child, bindings, context))
}
