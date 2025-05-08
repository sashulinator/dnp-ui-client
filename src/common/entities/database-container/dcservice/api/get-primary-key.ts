import { BASE_URL } from './constants'

export const NAME = 'get-primary-key'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  schema: string
  table: string
}

export type Result = string
