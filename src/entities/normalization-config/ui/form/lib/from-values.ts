import { Create } from '~/shared/api'

import { NormalizationConfig } from '../../../types/normalization-config'
import { Values } from '../types/values'

export function fromValues<N extends Create<NormalizationConfig>>(values: Values): N {
  const sdk = JSON.parse(values?.data?.sdk || '{}')
  const executables = JSON.parse(values?.data?.executables || '{}')

  return {
    ...values,
    data: {
      ...values?.data,
      sdk,
      executables,
    },
  } as N
}
