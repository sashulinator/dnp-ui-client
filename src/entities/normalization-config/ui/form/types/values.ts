import { NormalizationConfig } from '../../../types/normalization-config'
import { Create } from '~/lib/api'

type _Data = Omit<Create<NormalizationConfig>['data'], 'sdk'> & { sdk: string }

export type Values = Omit<Create<NormalizationConfig>, 'data'> & { data: _Data }
