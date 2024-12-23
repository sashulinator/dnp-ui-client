import type { Dctable, DctableUpdateInput } from '../types'
import { baseUrl } from './constants'

export const NAME = 'update'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: DctableUpdateInput
}

export type Result = Dctable
