import { Create } from '~dnp/shared/api'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = { input: Create<NormalizationConfig> }

export type ResponseData = NormalizationConfig
