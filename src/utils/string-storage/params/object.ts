import type { Dictionary } from '~/utils/core'

import type { Param } from '../types'

export class ObjectParam<TValue extends Dictionary> implements Param<TValue> {
  toString(value: TValue | undefined): string | undefined {
    if (value === undefined) return undefined
    return JSON.stringify(value)
  }

  toValue(str: string | undefined): TValue | undefined {
    if (str === undefined) return undefined

    try {
      return JSON.parse(str)
    } catch (e) {
      return undefined
    }
  }
}
