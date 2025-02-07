import type { Any } from '~/utils/core'

import { BASE_URL } from './constants'

export const NAME = 'excel-to-table'

export const URL = `${BASE_URL}/${NAME}`

export type RequestParams = {
  fileNames: string[]
  bucketName: string
  dcserviceId: string
  table: string
  schema: string
  database: string
}

export type Result = Any
