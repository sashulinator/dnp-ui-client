import type { Dcrow } from '~/common/entities/database-container'

import { BASE_URL } from './constants'

export const NAME = 'delete-rows-by-pk'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  id: string
  database: string
  table: string
  schema: string
  pks: (string | number)[]
}

export type Result = Dcrow.Row[]
