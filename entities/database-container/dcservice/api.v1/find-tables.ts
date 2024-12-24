import { type Where } from '~/slices/where'

import { baseUrl } from './constants'

export const NAME = 'find-tables'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  where: Where
  limit: number
  offset: number
}

export type Result = any
