import type { ExecutableParamModel } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/create`

export type RequestParams = {
  input: ExecutableParamModel
}

export type Result = ExecutableParamModel
