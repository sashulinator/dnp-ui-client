import type { Any } from '~/utils/core'

import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/excel-to-table`

export type RequestParams = {
  fileNames: string[]
  bucketName: string
  dcserviceId: string
  table: string
  database: string
}

export type Result = Any
