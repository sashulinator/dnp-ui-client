import { useMemo } from 'react'

import type { Dictionary, ValueOrSetter } from '~/utils/core'
import { emptyFn } from '~/utils/function'

import type { Block, ComponentProps, ComponentWithMeta, Context } from './types'
import { BlockFactory } from './ui.block-factory'

export interface Props {
  rootBlock: Block
  context: Record<string, unknown>
  componentMap: Record<string, ComponentWithMeta>
}

export const NAME = `ui-layoutSchema`

/**
 * ui-ReactFactory'
 */
export default function Component(props: Props): React.ReactNode {
  const { rootBlock, context, componentMap } = props

  useMemo(() => init(rootBlock, context as Context), [rootBlock, componentMap])

  const content = <BlockFactory context={context as Context} componentMap={componentMap} block={rootBlock} />

  return content
}

Component.displayName = NAME

function init(rootBlock: Block, context: Context) {
  const blockMap: Dictionary<ComponentProps> = {}
  traverse(rootBlock, blockMap, context)

  context['blocks'] = blockMap as any

  Object.values(blockMap).forEach((item) => {
    item.setProps(item)
  })
  // initBlockProps(blockMap)
}

function traverse(block: Block | string, map: Dictionary<ComponentProps>, context: Context) {
  if (typeof block === 'string') return

  map[block.id] = {
    ...block.props,
    block,
    context,
    setProps: emptyFn,
    blockComponent: {} as any,
  }

  map[block.id].setProps = (v: ValueOrSetter<Dictionary<unknown>>) => {
    const oldProps = map[block.id]
    const newProps = typeof v === 'function' ? v(oldProps) : { ...oldProps, ...v }
    block.listeners?.forEach((f) => f(newProps as any, oldProps))
    map[block.id] = newProps as any
  }

  block.children?.forEach((child) => traverse(child, map, context))
}

// function initBlockProps(map: Dictionary<{ block: Block }>) {
//   Object.values(map).forEach((item) => {
//     item.props = item.block.props
//   })
// }
