import { type CreateNormalizationConfig } from '../../../types/normalization-config'
import { Values } from '../types/values'

export function toValues(normalizationConfig: CreateNormalizationConfig): Values {
  const sdk = JSON.stringify(normalizationConfig?.data?.sdk, null, 2)
  const executables = JSON.stringify(normalizationConfig?.data?.executables, null, 2)

  return {
    ...normalizationConfig,
    data: {
      ...normalizationConfig?.data,
      executables,
      sdk,
    },
  }
}
