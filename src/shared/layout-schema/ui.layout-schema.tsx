import { useMemo } from 'react'

import type { Dictionary, ValueOrSetter } from '~/utils/core'
import { map } from '~/utils/dictionary'
import { createAtom } from '~/utils/store'

import { COMPONENT_PROPS } from './constants'
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

  const componentPropsMap = useMemo(() => init(rootBlock, context as Context), [context, rootBlock, componentMap])

  const content = (
    <BlockFactory
      context={context as Context}
      componentMap={componentMap}
      block={rootBlock}
      componentPropsMap={componentPropsMap}
    />
  )

  return content
}

Component.displayName = NAME

function init(rootBlock: Block, context: Context) {
  const componentPropsMap: Dictionary<ComponentProps> = {}

  traverse(rootBlock, componentPropsMap, context)

  Object.values(componentPropsMap).forEach((item) => {
    item.setProps(item)
  })

  return componentPropsMap
}

function traverse(block: Block | string, componentPropsMap: Dictionary<ComponentProps>, context: Context) {
  if (typeof block === 'string') return

  // Допрокидываем вторым аргументов во все функции componentProps
  const bindedBlockProps = map(block.props, (prop) => {
    if (typeof prop !== 'function') return prop
    return (...args: unknown[]) => prop(...args, componentProps)
  })

  const propsState = createAtom<Dictionary>(bindedBlockProps)

  const baseComponentProps: ComponentProps = {
    block,
    context,
    propsState,
    [COMPONENT_PROPS]: {},
  } as ComponentProps

  const componentProps: ComponentProps = {
    ...propsState.get(),
    ...bindedBlockProps,
    ...baseComponentProps,
  } as ComponentProps

  componentProps.setProps = (v: ValueOrSetter<Dictionary<unknown>>) => {
    const componentProps = componentPropsMap[block.id]
    const newProps = typeof v === 'function' ? v(componentProps) : { ...propsState.get(), ...v }
    const newComponentProps = {
      ...newProps,
      ...baseComponentProps,
      [COMPONENT_PROPS]: componentPropsMap,
    }

    block.listeners?.forEach((f) => f(newComponentProps, componentProps))
    propsState.set(newProps)
  }

  componentProps[COMPONENT_PROPS][block.id] = componentProps
  componentPropsMap[block.id] = componentProps

  block.children?.forEach((child) => traverse(child, componentPropsMap, context))
}
