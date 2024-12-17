import type { ExecutableParamModel } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/update`

export type RequestParams = {
  input: ExecutableParamModel
}

export type Result = ExecutableParamModel
