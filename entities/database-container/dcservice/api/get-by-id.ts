import type { Id } from '~/utils/core'

import { type Dcservice } from '../types'
import { baseUrl } from './constants'

export const NAME = 'get-by-id'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: Id
}

export type Result = Dcservice
