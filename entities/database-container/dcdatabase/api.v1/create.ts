import type { Dcdatabase, DcdatabaseCreateInput } from '../types'
import { baseUrl } from './constants'

export const NAME = 'create'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: DcdatabaseCreateInput
}

export type Result = Dcdatabase
