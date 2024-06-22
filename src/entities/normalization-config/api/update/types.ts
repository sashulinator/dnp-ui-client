import { NormalizationConfig } from '../../types/normalization-config'
import { Update } from '~/lib/api'

export type RequestData = { input: Update<NormalizationConfig> }

export type ResponseData = NormalizationConfig
