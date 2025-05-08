import type { Dcservice, DcserviceUpdateInput } from '../types'
import { BASE_URL } from './constants'

export const NAME = 'update'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  input: DcserviceUpdateInput
}

export type Result = Dcservice
