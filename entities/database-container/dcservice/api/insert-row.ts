import type { Dictionary } from '~/utils/core'

import { BASE_URL } from './constants'

export const NAME = 'insert-row'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  table: string
  schema: string
  // TODO подставить тип Row
  row: Dictionary
}

export type Result = Dictionary
