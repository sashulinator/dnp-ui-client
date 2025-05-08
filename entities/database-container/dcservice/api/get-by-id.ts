import type { Id } from '~/utils/core'

import { type Dcservice } from '../types'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/get-by-id`

export type RequestParams = {
  id: Id
}

export type Result = Dcservice
