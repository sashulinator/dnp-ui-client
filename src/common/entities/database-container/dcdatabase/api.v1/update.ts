import type { Dcdatabase, DcdatabaseUpdateInput } from '../types'
import { baseUrl } from './constants'

export const NAME = 'update'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: DcdatabaseUpdateInput
}

export type Result = Dcdatabase
