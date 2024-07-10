import { NormalizationConfig } from '../../../types/normalization-config'
import { Values } from '../types/values'
import { Create } from '~/lib/api'

export function toValues(normalizationConfig: Create<NormalizationConfig>): Values {
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
