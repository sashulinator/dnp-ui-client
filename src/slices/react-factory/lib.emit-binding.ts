import { emptyFn } from '~/utils/function'

import type { Binding, Block } from './models'

export function emitBinding(
  binding: Binding,
  currentEvent: string,
  block: Block | undefined,
  context: Record<string, unknown>,
  args: unknown[],
) {
  if (block === undefined) return
  if (binding.events && !binding.events?.includes(currentEvent)) return
  if (binding.selector && !binding.selector?.includes(block.id)) return

  const fn = createBindingFn(binding, currentEvent, block, context)
  fn(...args)
}

export function createBindingFn(
  binding: Binding,
  currentEvent: string,
  block: Block | undefined,
  context: Record<string, unknown>,
) {
  return (...args: unknown[]) => {
    if (block === undefined) return emptyFn

    const fn = new Function(
      'context',
      '...args',
      `
        const $ = { ...context, ...context?.map?.['${block.id}'] }
        return (${binding.script})(...args)
      `,
    )

    return fn({ ...context, event: currentEvent, binding, block }, ...args)
  }
}
