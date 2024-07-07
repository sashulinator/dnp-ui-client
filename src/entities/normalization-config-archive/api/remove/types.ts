import { type NormalizationConfig } from '~/entities/normalization-config/types/normalization-config'
import { Id } from '~/utils/core'

export type RequestData = { id: Id }

export type ResponseData = NormalizationConfig
