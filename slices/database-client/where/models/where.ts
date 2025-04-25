import type { BooleanFilter } from './boolean-filter'
import type { IntFilter } from './int-filter'
import type { StringFilter } from './string-filter'

export type ToWhere<T extends Record<string, unknown>> = {
  AND?: ToWhere<T> | ToWhere<T>[]
  OR?: ToWhere<T>[]
  NOT?: ToWhere<T> | ToWhere<T>[]
} & ReplaceValueByFilter<T>

export type ReplaceValueByFilter<T> = {
  [K in keyof T]?: T[K] extends string
    ? StringFilter
    : T[K] extends number
      ? IntFilter
      : T[K] extends boolean
        ? BooleanFilter
        : unknown
}
