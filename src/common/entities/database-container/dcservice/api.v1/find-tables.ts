import { baseUrl } from './constants'

export const NAME = 'find-tables'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
}

export type Result = any
