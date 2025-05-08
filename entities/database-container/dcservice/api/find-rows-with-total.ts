import type { Sort, Where } from '~/common/slices/database-client'

import type { Dcrow } from '../../dcrow'
import { BASE_URL } from './constants'

export const NAME = 'find-rows-with-total'

export const url = `${BASE_URL}/${NAME}`

export type Sort = Sort.ToSort<Dcrow>
export type Where = Where.ToWhere<Dcrow>

export type RequestParams = {
  id: string
  database: string
  schema: string
  table: string
  limit?: number | undefined
  where?: Where.ToWhere<Dcrow> | undefined
  sort?: Sort.ToSort<Dcrow> | undefined
  offset?: number | undefined
}

export type Result = {
  items: Record<string, unknown>[]
  total: number
}
