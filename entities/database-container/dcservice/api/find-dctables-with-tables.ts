import type { ToSort } from '~/slices/sort'
import type { Where } from '~/slices/where'

import type { DctableWithTable } from '../../dctable'
import { BASE_URL } from './constants'

export const NAME = 'find-dctables-with-tables'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  where?: Where
  limit?: number
  offset?: number
  sort?: ToSort<Pick<DctableWithTable, 'name' | 'schema'>> | undefined
  dcserviceId: string
  database: string
}

export type Result = {
  items: DctableWithTable[]
  total: number
}
