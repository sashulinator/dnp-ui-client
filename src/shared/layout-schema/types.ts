import type { ReactHTML } from 'react'

import type { Dictionary, SetterOrUpdater } from '~/utils/core'
import type { Any } from '~/utils/core'
import type { Atom } from '~/utils/store'
import type { Union } from '~/utils/types/union'

export interface ComponentWithMeta {
  render: React.ComponentType<Any>
  bindings?: ((props: ComponentProps) => void)[] | undefined
}

export interface Block {
  id: string
  name: Union<string, keyof ReactHTML>
  props: Record<string, unknown>
  listeners?: ((props: ComponentProps, oldProps: ComponentProps) => void)[] | undefined
  children?: Block[]
}

export type ComponentProps<TProps = Dictionary> = {
  block: Block
  setProps: SetterOrUpdater<Partial<TProps>>
  context: Context
  propsState: Atom<TProps>
  blocks: Dictionary<ComponentProps>
} & TProps

export type Context = {
  isEditingMode?: boolean | undefined
}
