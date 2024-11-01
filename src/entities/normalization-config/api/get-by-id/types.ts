import { Id } from '~/utils/core'

import { type NormalizationConfig } from '../../types/normalization-config'

export interface RequestData {
  id: Id
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = NormalizationConfig
