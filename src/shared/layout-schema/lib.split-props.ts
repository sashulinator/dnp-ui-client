import type { Dictionary } from '~/utils/core'

import type { ComponentProps } from './types'

export function splitProps<T extends Dictionary>(props: ComponentProps<T>): [T, ComponentProps] {
  const { block, blocks, setProps, context, propsState, ...componentProps } = props

  return [
    componentProps as any,
    {
      block,
      blocks,
      setProps,
      context,
      propsState,
    } as any,
  ]
}
