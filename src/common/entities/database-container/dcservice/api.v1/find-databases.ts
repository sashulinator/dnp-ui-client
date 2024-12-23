import { baseUrl } from './constants'

export const NAME = 'find-databases'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
}

export type Result = any
