import type { Any, Key } from '~/utils/core'

export interface Control extends Record<string, Any> {
  defaultValue: unknown
  input: string
  path: Key[]
  label: string
}
