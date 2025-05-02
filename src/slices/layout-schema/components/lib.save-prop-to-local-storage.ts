import type { Dictionary } from '~/utils/core'
import { omit } from '~/utils/dictionary'
import type { Atom } from '~/utils/store'
import { Params } from '~/utils/string-storage'

import type { Binding, ComponentProps } from '../types'

const TYPE_PARAMS = {
  object: Params.ObjectParam,
  string: Params.StringParam,
  number: Params.NumberParam,
} as const

export const savePropToLocalStorage = {
  id: 'savePropToLocalStorage',
  fn(componentProps: ComponentProps): void {
    const propsState = componentProps.propsState as unknown as Atom<
      {
        localStorage?: { key: string; prop: string; type: 'object' | 'string' }
      } & Dictionary
    >

    const lsConfig = propsState.get().localStorage
    const key = lsConfig?.key
    const prop = lsConfig?.prop as string
    const Param = TYPE_PARAMS[lsConfig?.type as keyof typeof TYPE_PARAMS] ?? Params.StringParam

    const param = new Param()

    if (!key || !prop) return

    delete componentProps.block.props['localStorage']

    propsState.subscribe((newProps) => {
      if (newProps.localStorage) {
        propsState.set(omit(propsState.get(), 'localStorage'))
      }

      const ret = param.toString(newProps[prop] as any)

      if (ret) {
        localStorage.setItem(key, ret)
      } else {
        localStorage.removeItem(key)
      }
    })

    const localStorageValue = localStorage.getItem(lsConfig?.key)

    if (localStorageValue !== null && !propsState.get()[prop]) {
      propsState.set({ ...omit(propsState.get(), 'localStorage'), [prop]: param.toValue(localStorageValue) })
    }
  },
} satisfies Binding
