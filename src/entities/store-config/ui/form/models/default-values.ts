import { type CreateStoreConfig } from '../../../types/store-config'
import { Partial } from '~/utils/types/object'

export const defaultValues: Partial<CreateStoreConfig, 'deep'> = {
  kn: '',
  type: 'postgres',
  data: {
    host: '10.0.0.0',
    port: '5432',
  },
}
