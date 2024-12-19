import { Any } from '~/utils/core'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = { data: { processing: Any } }

export type ResponseData = NormalizationConfig
