import type { Param } from '../types'

export class StringParam implements Param<string> {
  toString(value: string | undefined): string | undefined {
    return value
  }

  toValue(str: string | undefined): string | undefined {
    return str
  }
}
