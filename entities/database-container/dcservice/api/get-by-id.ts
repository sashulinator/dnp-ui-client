import type { Id } from '~/utils/core'

import { type Dcservice } from '../types'
import { baseUrl } from './constants'

export const URL = `${baseUrl}/get-by-id`

export type RequestParams = {
  id: Id
}

export type Result = Dcservice
