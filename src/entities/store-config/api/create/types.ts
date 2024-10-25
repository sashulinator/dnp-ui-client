import { Create } from '~dnp/shared/api'

import { StoreConfig } from '../../types/store-config'

export type RequestData = { input: Create<StoreConfig> }

export type ResponseData = StoreConfig
