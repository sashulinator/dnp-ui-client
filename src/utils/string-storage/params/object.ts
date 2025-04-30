import type { Dictionary } from '~/utils/core'

import type { Param } from '../types'

export class ObjectParam implements Param<Dictionary> {
  toString(value: Dictionary | undefined): string | undefined {
    if (value === undefined) return undefined
    return JSON.stringify(value)
  }

  toValue(str: string | undefined): Dictionary | undefined {
    if (str === undefined) return undefined

    try {
      return JSON.parse(str)
    } catch (e) {
      return undefined
    }
  }
}
