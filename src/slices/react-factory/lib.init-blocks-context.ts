import { type Dictionary, type ValueOrSetter } from '~/utils/core'

import type { Block, BlockNode, BlocksContext } from './models'

export function initBlocksContext(block: BlockNode, context: BlocksContext) {
  if (typeof block === 'string') return

  context.blocks[block.id] = block
  context.props[block.id] = {
    props: propToFunction(block.props),
    setProps: _setProps,
  }

  if (block.children) block.children.forEach((child) => initBlocksContext(child, context))

  // private
  function _setProps(initProps: ValueOrSetter<Record<string, unknown>>) {
    // @ts-ignore
    const value = typeof initProps === 'function' ? initProps(context.props[block.id].props) : initProps
    // @ts-ignore
    context.props[(block as Block).id].props = value
  }
}

function propToFunction(props: Dictionary | undefined) {
  const entries = Object.entries(props || {})

  const ret = entries.reduce(
    (acc, [key, value]) => {
      if (/^\$/.test(key)) {
        const newKey = key.slice(1)
        acc[newKey] = new Function('...args', `return (${value})(...args)`)
      } else {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, unknown>,
  )

  return ret
}
