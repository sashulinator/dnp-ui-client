import { Partial } from '~/utils/types/object'

import { CreateStoreConfig } from '../../../types/store-config'
import { Values } from '../types/values'

export function toValues(storeConfig: Partial<CreateStoreConfig, 'deep'>): Values {
  return storeConfig as Values
}
