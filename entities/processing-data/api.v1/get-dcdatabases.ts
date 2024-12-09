import { type DcdatabaseBase } from '../../database-container'
import { baseUrl } from './constants'

export const NAME = 'get-dcdatabases'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = never

export type Result = {
  initial: DcdatabaseBase
  operational: DcdatabaseBase
  target: DcdatabaseBase
}
