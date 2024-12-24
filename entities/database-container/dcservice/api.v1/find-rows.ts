import { type Where } from '~/slices/where'

import { baseUrl } from './constants'

export const NAME = 'find-rows'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  table: string
  where?: Where
  limit?: number
  offset?: number
}

export type Result = {
  items: Record<string, unknown>[]
  total: number
  columns: { name: string; display: string }[]
}
