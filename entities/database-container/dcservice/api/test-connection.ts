import { BASE_URL } from './constants'

export const NAME = 'test-connection'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  client: string
  host: string
  port: number
  user: string
  password: string
  database: string
}

export type Result = boolean
