import { type CreateStoreConfig } from '../../../types/store-config'

export const defaultValues: CreateStoreConfig = {
  kn: '',
  type: 'jdbc',
  data: {
    host: '10.0.0.0',
    port: '5432',
    username: '',
    password: '',
    database: '',
  },
}
