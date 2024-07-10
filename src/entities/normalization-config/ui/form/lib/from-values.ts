import { NormalizationConfig } from '../../../types/normalization-config'
import { Values } from '../types/values'
import { Create } from '~/lib/api'

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
