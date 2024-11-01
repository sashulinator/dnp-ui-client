import { Create } from '~/shared/api'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = { input: Create<NormalizationConfig> }

export type ResponseData = NormalizationConfig
