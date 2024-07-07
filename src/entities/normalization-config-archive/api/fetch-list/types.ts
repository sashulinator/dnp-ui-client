import { NormalizationConfig } from '~/entities/normalization-config/types/normalization-config'
import { List } from '~/lib/api'
import { StringFilter } from '~/lib/api/types/string-filter'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = List<NormalizationConfig>
