import { useMemo } from 'react'

import { type Dictionary, type ValueOrSetter } from '~/utils/core'
import { map, strict } from '~/utils/dictionary'
import { BaseError } from '~/utils/error'
import { debounce } from '~/utils/function'
import { createAtom } from '~/utils/store'

import { COMPONENT_PROPS } from './constants'
import type { Block, ComponentProps, ComponentWithMeta, Context } from './types'
import { BlockFactory } from './ui.block-factory'

export interface Props {
  rootBlock: Block
  context: Record<string, unknown>
  componentMap: Dictionary<ComponentWithMeta>
  onError?: ((e: BaseError<Dictionary>) => void) | undefined
}

export const NAME = `ui-layoutSchema`

/**
 * ui-ReactFactory'
 */
export default function Component(props: Props): React.ReactNode {
  const { rootBlock, context, componentMap, onError } = props

  const componentPropsMap = useMemo(
    // onError вызывается во время рендеринга схемы
    // поэтому важно вызвать ее после того как отрендерится
    // иначе может быть ошибка в консоле от реакта о том что мы пытаемся
    // вызвать перерендеринг будучи в рендеринге
    // плюс сокращаем количество ошибок до 1
    () => init(rootBlock, context as Context, componentMap, debounce(onError, 0)),
    [context, rootBlock, componentMap],
  )

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

function init(
  rootBlock: Block,
  context: Context,
  componentMap: Dictionary<ComponentWithMeta>,
  onError: ((e: BaseError<Dictionary>) => void) | undefined,
) {
  const componentPropsMap = strict<Dictionary<ComponentProps>>({})

  traverse(rootBlock, componentPropsMap, context, onError)

  Object.values(componentPropsMap).forEach((item) => {
    componentMap[item.block.name as string]?.bindings?.forEach((binding) => {
      try {
        binding.fn(item)
      } catch (e) {
        onError && onError(new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item, binding }))
      }
    })
    try {
      item.setProps(item.block.props)
    } catch (e) {
      onError && onError(new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item }))
    }
  })

  return componentPropsMap
}

function traverse(
  block: Block | string,
  componentPropsMap: Dictionary<ComponentProps>,
  context: Context,
  onError: ((e: BaseError<Dictionary>) => void) | undefined,
) {
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

    block.listeners?.forEach((listener, i) => {
      try {
        listener(newComponentProps, componentProps)
      } catch (e) {
        onError &&
          onError(
            new BaseError(`${(e as Error).message}`, {
              componentProps: newComponentProps,
              oldComponentProps: newComponentProps,
              listenerIndex: i,
            }),
          )
      }
    })

    propsState.set(newProps)
  }

  componentProps[COMPONENT_PROPS][block.id] = componentProps
  componentPropsMap[block.id] = componentProps

  block.children?.forEach((child) => traverse(child, componentPropsMap, context, onError))
}
