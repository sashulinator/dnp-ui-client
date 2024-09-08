import { CreateDictionaryTable } from '../../../types/dictionary-table'
import { Values } from '../types/values'

export function fromValues<N extends CreateDictionaryTable>(values: Values): N {
  return {
    ...values,
  } as N
}
