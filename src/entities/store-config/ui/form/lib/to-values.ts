import { CreateStoreConfig } from '../../../types/store-config'
import { Values } from '../types/values'
import { Partial } from '~/utils/types/object'

export function toValues(storeConfig: Partial<CreateStoreConfig, 'deep'>): Values {
  return storeConfig as Values
}
