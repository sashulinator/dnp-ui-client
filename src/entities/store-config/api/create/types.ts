import { StoreConfig } from '../../types/store-config'
import { Create } from '~/lib/api'

export type RequestData = { input: Create<StoreConfig> }

export type ResponseData = StoreConfig
