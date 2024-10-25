import { Id } from '~dnp/utils/core'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = { id: Id }

export type ResponseData = NormalizationConfig
