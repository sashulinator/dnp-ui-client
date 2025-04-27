import React, { useEffect, useState } from 'react'

import { usePrevious } from '~/utils/core-hooks'
import { map, remove } from '~/utils/dictionary'

import type { Block, BlockNode, ComponentProps, ComponentWithMeta, Context } from './models'

interface Props {
  block: BlockNode
  context: Context
  componentMap: Record<string, ComponentWithMeta>
}

export const NAME = `ui-layoutSchema-blockStringFactory`

export function BlockStringFactory(props: Props): React.ReactNode {
  const block = props.block
  if (typeof block === 'string') return block
  return <BlockFactory {...props} block={block} />
}

export function BlockFactory(props: Omit<Props, 'block'> & { block: Block }): React.ReactNode {
  const { block, componentMap, context } = props

  const [blockProps, setBlockProps] = useState(block.props)

  // Получаем функцию компонента
  const blockComponent = componentMap[block.name as string]
  const renderComponent = blockComponent?.render || block.name // в name может быть строка div span

  const setProps = (v: any) => {
    if (typeof v === 'function') setBlockProps(v)
    setBlockProps((s) => ({ ...s, ...v }))
  }

  const bindedBlockProps = map(blockProps, (prop) => {
    if (typeof prop !== 'function') return prop
    return (...args: unknown[]) => prop(...args, { context, block, blockComponent, setProps })
  })

  const componentProps: ComponentProps = {
    ...remove(bindedBlockProps, 'onPropsChange'),
    context,
    blockComponent: blockComponent,
    block,
    setProps,
  }

  const prevComponentProps = usePrevious(componentProps)
  useEffect(() => {
    ;(block.props as any).onPropsChange?.(componentProps, prevComponentProps)
  }, [blockProps])

  context['blocks'][block.id] = componentProps

  // Рендерим сначала детей
  const reactChildren = block.children?.map((child) => {
    const key = typeof child === 'string' ? child : child.id
    return <BlockStringFactory key={key} block={child} context={context} componentMap={componentMap} />
  })

  return React.createElement(renderComponent, { key: block.id, ...componentProps }, reactChildren)
}
