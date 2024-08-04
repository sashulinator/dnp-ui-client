import { NormalizationConfig, type CreateNormalizationConfig } from '../../../types/normalization-config'

type _Data = Omit<CreateNormalizationConfig['data'], 'sdk' | 'executables'> & { sdk: string; executables: string }

export type Values = Omit<CreateNormalizationConfig, 'data'> & { data: _Data } & Partial<
    Omit<NormalizationConfig, 'data'>
  >
