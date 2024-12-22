import { type Dcservice } from '../types'
import { baseUrl } from './constants'

export const NAME = 'get-by-id'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
}

export type Result = Dcservice
