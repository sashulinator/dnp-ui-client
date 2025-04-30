export interface Param<T> {
  toString: (value: T | undefined) => string | undefined
  toValue: (str: string | undefined) => T | undefined
}
