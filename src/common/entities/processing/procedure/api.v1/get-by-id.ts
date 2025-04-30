import { type Procedure } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/get-by-id`

export type RequestParams = {
  id: string
}

export type Result = Procedure
