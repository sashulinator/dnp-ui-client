import type { ExecutableDesign } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/create`

export type RequestParams = {
  input: ExecutableDesign
}

export type Result = ExecutableDesign
