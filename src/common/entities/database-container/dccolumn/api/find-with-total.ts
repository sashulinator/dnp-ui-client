import type { Sort, Where } from '~/common/slices/database-client'

import type { Dccolumn } from '../types'
import { URL as PARENT_URL } from './constants'

export const NAME = 'find-with-total'

export const URL = `${PARENT_URL}/${NAME}`

export type Sort = Sort.ToSort<Dccolumn>
export type Where = Where.ToWhere<Dccolumn>

export type RequestParams = {
  id: string
  database: string
  table: string
  schema: string
  limit?: number | undefined
  where?: Where | undefined
  sort?: Sort | undefined
  offset?: number | undefined
}

export type Result = {
  items: Dccolumn[]
  total: number
}
