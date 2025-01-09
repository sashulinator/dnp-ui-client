import { emitBinding } from './lib.emit-binding'
import type { Binding, BlockNode, BlocksContext } from './models'

export function emitBlocksBindings(
  eventName: string,
  block: BlockNode,
  bindings: Binding[] | undefined,
  context: BlocksContext,
  args: unknown[],
) {
  if (typeof block === 'string') return

  bindings?.forEach((binding) => emitBinding(binding, eventName, block, context, args))

  if (block.children) block.children.forEach((child) => emitBlocksBindings(eventName, child, bindings, context, args))
}
