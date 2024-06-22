import { type NormalizationConfig } from '../../types/normalization-config'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = NormalizationConfig
