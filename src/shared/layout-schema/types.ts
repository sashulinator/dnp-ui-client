import type { ReactHTML } from 'react'

import type { Dictionary, SetterOrUpdater } from '~/utils/core'
import type { Any } from '~/utils/core'
import type { Union } from '~/utils/types/union'

export interface ComponentWithMeta {
  render: React.ComponentType<Any>
  // Добавим мета информацию, например defaultProps
}

export interface Block {
  id: string
  name: Union<string, keyof ReactHTML>
  props: Record<string, unknown>
  children?: BlockNode[]
}

export type BlockNode = Block | string

export type ComponentProps<TProps = Dictionary> = {
  block: Block
  blockComponent: ComponentWithMeta
  setProps: SetterOrUpdater<Partial<TProps>>
  context: Context
} & TProps

export type Context = {
  blocks: Dictionary<ComponentProps>
  isEditingMode?: boolean | undefined
}
