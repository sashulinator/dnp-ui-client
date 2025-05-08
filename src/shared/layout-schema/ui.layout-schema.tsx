import { useMemo } from 'react'

import { type Dictionary, type ValueOrSetter } from '~/utils/core'
import { map } from '~/utils/dictionary'
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
  bindings?: ((props: ComponentProps) => void)[]
}

export const NAME = `ui-layoutSchema`

/**
 * ui-ReactFactory'
 */
export default function Component(props: Props): React.ReactNode {
  const { rootBlock, context, bindings, componentMap, onError } = props

  const componentPropsMap = useMemo(
    // onError вызывается во время рендеринга схемы
    // поэтому важно вызвать ее после того как отрендерится
    // иначе может быть ошибка в консоле от реакта о том что мы пытаемся
    // вызвать перерендеринг будучи в рендеринге
    // плюс сокращаем количество ошибок до 1
    () => init(rootBlock, context as Context, componentMap, bindings, debounce(onError, 0)),
    [context, bindings, rootBlock, componentMap],
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
  bindings: ((props: ComponentProps) => void)[] | undefined,
  onError: ((e: BaseError<Dictionary>) => void) | undefined,
) {
  const componentPropsMap = _strict<Dictionary<ComponentProps>>({})

  traverse(rootBlock, componentPropsMap, context, onError)

  Object.values(componentPropsMap).forEach((item) => {
    componentMap[item.block.name as string]?.bindings?.forEach((binding) => {
      try {
        binding.fn(_rebuldComponentProps(item.block.id, componentPropsMap))
      } catch (e) {
        onError && onError(new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item, binding }))
      }
    })

    item.block.bindings?.forEach((binding, index) => {
      try {
        binding(_rebuldComponentProps(item.block.id, componentPropsMap))
      } catch (e) {
        onError &&
          onError(
            new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item, binding, bindingIndex: index }),
          )
      }
    })
    bindings?.forEach((binding, index) => {
      try {
        binding(_rebuldComponentProps(item.block.id, componentPropsMap))
      } catch (e) {
        onError &&
          onError(
            new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item, binding, bindingIndex: index }),
          )
      }
    })
    try {
      // В propsState сейчас стейт который был положен при запуске bindings поэтому он идет последним
      item.setProps({ ...item.block?.props, ...item.propsState.get() })
    } catch (e) {
      onError && onError(new BaseError(`${(e as Error).message}`, { cause: e, componentProps: item }))
    }

    _rebuldComponentProps(item.block.id, componentPropsMap)
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
  const bindedBlockProps = map(block.props || {}, (prop) => {
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
    const newProps = typeof v === 'function' ? v({ ...propsState.get() }) : { ...propsState.get(), ...v }

    const newComponentProps = _rebuldComponentProps(block.id, componentPropsMap, newProps)
    propsState.set(newProps)

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
  }

  componentProps[COMPONENT_PROPS][block.id] = componentProps
  componentPropsMap[block.id] = componentProps

  block.children?.forEach((child) => traverse(child, componentPropsMap, context, onError))
}

function _rebuldComponentProps(blockId: string, componentPropsMap: Dictionary<ComponentProps>, state?: Dictionary) {
  const current = componentPropsMap[blockId]

  const componentProps = {
    block: current.block,
    context: current.context,
    [COMPONENT_PROPS]: componentPropsMap,
    setProps: current.setProps,
    propsState: current.propsState,
    ...(state || current.propsState.get()),
  }

  componentPropsMap[blockId] = componentProps

  return componentProps
}

type Config = {
  ignore: string[]
}

const defIgnore = ['toJSON', 'valueOf', 'inspect']

function _strict<T extends Dictionary>(obj: T, config?: Config): T {
  return new Proxy(obj, {
    get: (target, key) => {
      const ignore = config?.ignore || defIgnore
      const v = target[key as string]

      if (typeof key !== 'string') return v

      if (v !== undefined) {
        // @ts-ignore
        if (v.propsState) {
          return _rebuldComponentProps(key as string, target as any)
        }
        return v
      }

      if (ignore.includes(key)) {
        return v
      }

      const msg = `Property '${key as string}' is undefined`
      const err = new ReferenceError(msg)

      throw err
    },
  })
}
