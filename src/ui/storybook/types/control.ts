import { Any, Key } from '~/utils/core'

export interface Control extends Record<string, Any> {
  defaultValue: unknown
  input: 'input' | 'select' | 'checkbox'
  path?: Key[]
  name: string
}
