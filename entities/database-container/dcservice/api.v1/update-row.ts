import type { Dictionary } from '~/utils/core'

import { baseUrl } from './constants'

export const NAME = 'update-row'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  table: string
  schema: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where: any
  // TODO подставить тип Row
  row: Dictionary
}

export type Result = Dictionary
