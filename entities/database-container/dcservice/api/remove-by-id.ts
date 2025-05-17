import type { Dcservice } from '../types'
import { BASE_URL } from './constants'

export const NAME = 'remove-by-id'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  id: string
}

export type Result = Dcservice
