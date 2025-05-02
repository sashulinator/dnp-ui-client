import React, { useEffect } from 'react'

import type { Dictionary } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

import type { Block, ComponentProps, ComponentWithMeta, Context } from './types'

interface Props {
  block: Block
  context: Context
  componentMap: Record<string, ComponentWithMeta>
  componentPropsMap: Dictionary<ComponentProps>
}

export const NAME = `ui-layoutSchema-blockStringFactory`

export function BlockStringFactory(props: Props): React.ReactNode {
  const block = props.block
  if (typeof block === 'string') return block
  return <BlockFactory {...props} block={block} />
}

export function BlockFactory(props: Omit<Props, 'block'> & { block: Block }): React.ReactNode {
  const { block, componentMap, context, componentPropsMap } = props

  const componentProps = componentPropsMap[block.id]
  const propsState = componentProps.propsState

  useSubscribeUpdate(propsState.subscribe, [propsState])

  if (context.isEditingMode) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      propsState.set({ ...propsState.get(), ...block.props })
    }, [block.props])
  }

  // Получаем функцию компонента
  const blockComponent = componentMap[block.name as string]
  const renderComponent = blockComponent?.render || block.name // в name может быть строка div span

  // Рендерим сначала детей
  const reactChildren = block.children?.map((child) => {
    const key = typeof child === 'string' ? child : child.id
    return (
      <BlockStringFactory
        key={key}
        block={child}
        context={context}
        componentMap={componentMap}
        componentPropsMap={componentPropsMap}
      />
    )
  })

  return React.createElement(renderComponent, { key: block.id, ...componentProps, ...propsState.get() }, reactChildren)
}
