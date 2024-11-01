import { List } from '~/shared/api'
import { StringFilter } from '~/shared/api/types/string-filter'

import { StoreConfig } from '../../types/store-config'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof StoreConfig, boolean>> | undefined
}

export type ResponseData = List<StoreConfig>
