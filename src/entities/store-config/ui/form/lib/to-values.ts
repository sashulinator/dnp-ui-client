import { CreateStoreConfig } from '../../../types/store-config'
import { Values } from '../types/values'
import { Create } from '~/lib/api'

export function toValues(storeConfig: Create<CreateStoreConfig>): Values {
  return storeConfig
}
