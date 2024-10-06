import type { CreateDictionaryTable } from '../../../models/dictionary-table'
import type { Values } from '../types/values'

export function fromValues<N extends CreateDictionaryTable>(values: Values): N {
  return {
    ...values,
  } as N
}
