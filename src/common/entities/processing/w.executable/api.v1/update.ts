import type { ExecutableDesign } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/update`

export type RequestParams = {
  input: ExecutableDesign
}

export type Result = ExecutableDesign
