import { Create } from '~/shared/api'

import { StoreConfig } from '../../types/store-config'

export type RequestData = { input: Create<StoreConfig> }

export type ResponseData = StoreConfig
