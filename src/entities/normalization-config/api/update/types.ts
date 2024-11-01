import { Update } from '~/shared/api'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = { input: Update<NormalizationConfig> }

export type ResponseData = NormalizationConfig
