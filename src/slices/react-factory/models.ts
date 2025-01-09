import type { ReactHTML } from 'react'

import type { SetterOrUpdater } from '~/utils/core'
import type { Any } from '~/utils/core'
import type { Union } from '~/utils/types/union'

export interface Schema {
  block: Block
  bindings?: Binding[] | undefined
}

export interface Binding {
  script: string
  events?: string[] | undefined
  selector?: string[] | undefined
}

export interface BlockComponent {
  passContextProp?: boolean | undefined
  render: React.ComponentType<Any>
}

export interface Block {
  id: string
  name: Union<string, keyof ReactHTML>
  props: Record<string, unknown>
  children?: BlockNode[]
}

export type BlockNode = Block | string

export type BlocksContext = {
  map: Record<
    string,
    {
      block: Block
      props: Record<string, unknown>
      setProps: SetterOrUpdater<Record<string, unknown>>
    }
  >
}
