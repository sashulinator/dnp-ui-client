import { Update } from '~/shared/api'

import { StoreConfig } from '../../types/store-config'

export type RequestData = { input: Update<StoreConfig> }

export type ResponseData = StoreConfig
