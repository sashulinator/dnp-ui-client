import { type ValueOrSetter, assertDefined } from '~/utils/core'

import { createBindingFn } from './lib.emit-binding'
import { emitBlocksBindings } from './lib.emit-init-blocks-bindings'
import type { Binding, Block, BlockNode, BlocksContext } from './models'

export function initBlocksContext(block: BlockNode, bindings: Binding[] | undefined, context: BlocksContext) {
  if (context.map === undefined) {
    context.map = {}
  }

  if (typeof block === 'string') return

  context.map[block.id] = {
    block,
    props: propToFunction(block, bindings, context),
    setProps: _setProps,
  }

  if (block.children) block.children.forEach((child) => initBlocksContext(child, bindings, context))

  // private
  function _setProps(initProps: ValueOrSetter<Record<string, unknown>>) {
    // @ts-ignore
    const value = typeof initProps === 'function' ? initProps(context.map[block.id].props) : initProps
    // @ts-ignore
    context.map[(block as Block).id].props = value
  }
}

function propToFunction(block: BlockNode | undefined, bindings: Binding[] | undefined, context: BlocksContext) {
  if (typeof block === 'string') return {}
  assertDefined(block)

  const entries = Object.entries(block?.props || {})

  const ret = entries.reduce(
    (acc, [key, value]) => {
      if (/^\$/.test(key)) {
        const newKey = key.slice(1)
        acc[newKey] = (...args: unknown[]) => {
          createBindingFn({ script: value as string }, newKey, block, context)(...args)
          emitBlocksBindings(newKey, block, bindings, context, args)
        }
      } else {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, unknown>,
  )

  return ret
}
