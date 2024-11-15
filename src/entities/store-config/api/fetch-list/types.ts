import { type List } from '~/shared/api'
import { type StringFilter } from '~/shared/api/types/string-filter'

import { type StoreConfig } from '../../types/store-config'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof StoreConfig, boolean>> | undefined
}

export type ResponseData = List<StoreConfig>
