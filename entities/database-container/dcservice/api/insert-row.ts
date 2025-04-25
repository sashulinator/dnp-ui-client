import type { Dictionary } from '~/utils/core'

import { baseUrl } from './constants'

export const NAME = 'insert-row'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  table: string
  schema: string
  // TODO подставить тип Row
  row: Dictionary
}

export type Result = Dictionary
