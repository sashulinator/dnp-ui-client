import { StoreConfig } from '../../types/store-config'
import { Update } from '~/lib/api'

export type RequestData = { input: Update<StoreConfig> }

export type ResponseData = StoreConfig
