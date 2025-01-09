import type { Binding, Block } from './models'

export function emitBinding(
  binding: Binding,
  currentEvent: string,
  block: Block | undefined,
  context: Record<string, unknown>,
) {
  if (block === undefined) return
  if (binding.events && !binding.events?.includes(currentEvent)) return
  if (binding.selector && !binding.selector?.includes(block.id)) return
  const fn = new Function(
    'context',
    '...args',
    `
      const $ = { ...context, ...context.props['${block.id}'] }
      return (${binding.script})(...args)
  `,
  )
  fn.call(null, { ...context, event: currentEvent, binding, block })
}
