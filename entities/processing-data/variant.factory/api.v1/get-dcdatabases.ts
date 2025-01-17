import { type Dcdatabase } from '~/entities/database-container'

import { baseUrl } from './constants'

export const NAME = 'get-dcdatabases'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = never

export type Result = {
  initial: Dcdatabase.Dcdatabase[]
  operational: Dcdatabase.Dcdatabase
  target: Dcdatabase.Dcdatabase
}
