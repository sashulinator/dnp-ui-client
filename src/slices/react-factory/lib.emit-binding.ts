import type { Binding, Block } from './models'

export function emitBinding(
  binding: Binding,
  currentEvent: string,
  block: Block | undefined,
  context: Record<string, unknown>,
) {
  if (block === undefined) return
  if (binding.events && !binding.events?.includes(currentEvent)) return
  if (binding.ids && !binding.ids?.includes(block.id)) return
  const fn = new Function('$', binding.data)
  fn({ ...context, event: currentEvent, binding, block })
}
