import type { ExecutableSchema } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/update`

export type RequestParams = {
  input: ExecutableSchema
}

export type Result = ExecutableSchema
