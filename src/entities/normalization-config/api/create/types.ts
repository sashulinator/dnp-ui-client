import { NormalizationConfig } from '../../types/normalization-config'
import { Create } from '~/lib/api'

export type RequestData = { input: Create<NormalizationConfig> }

export type ResponseData = NormalizationConfig
