import type { Dctable, DctableCreateInput } from '../types'
import { baseUrl } from './constants'

export const NAME = 'create'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: DctableCreateInput
}

export type Result = Dctable
