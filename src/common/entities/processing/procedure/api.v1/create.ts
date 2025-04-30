import type { Procedure } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/create`

export type RequestParams = {
  input: Procedure
}

export type Result = Procedure
