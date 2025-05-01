import type { Param } from '../types'

export class NumberParam implements Param<number> {
  toString(value: number | undefined): string | undefined {
    return value?.toString()
  }

  toValue(str: string | undefined): number | undefined {
    return parseFloat(str || '')
  }
}
