import { CreateStoreConfig } from '../../../types/store-config'
import { Values } from '../types/values'

export function fromValues<N extends CreateStoreConfig>(values: Values): N {
  return values as N
}
