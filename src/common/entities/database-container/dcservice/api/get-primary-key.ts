import { baseUrl } from './constants'

export const NAME = 'get-primary-key'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  schema: string
  table: string
}

export type Result = string
