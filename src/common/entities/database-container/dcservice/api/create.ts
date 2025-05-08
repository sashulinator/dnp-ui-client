import type { Dcservice, DcserviceCreateInput } from '../types'
import { BASE_URL } from './constants'

export const NAME = 'create'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  input: DcserviceCreateInput
}

export type Result = Dcservice
