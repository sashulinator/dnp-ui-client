import { type ValueOrSetter } from '~/utils/core'

import type { Block, BlockNode, BlocksContext } from './models'

export function initBlocksContext(block: BlockNode, context: BlocksContext) {
  if (typeof block === 'string') return

  context.blocks[block.id] = block
  context.blocksProps[block.id] = {
    props: block.props || {},
    setProps: _setProps,
  }

  if (block.children) block.children.forEach((child) => initBlocksContext(child, context))

  // private
  function _setProps(initProps: ValueOrSetter<Record<string, unknown>>) {
    // @ts-ignore
    const value = typeof initProps === 'function' ? initProps(block.props) : initProps
    // @ts-ignore
    context.blocksProps[(block as Block).id].props = value
  }
}
