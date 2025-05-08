import type { ToSort } from '~/slices/sort'
import type { Where } from '~/slices/where'

import type { Dcdatabase } from '../../dcdatabase'
import { BASE_URL } from './constants'

export const NAME = 'find-databases'

export const url = `${BASE_URL}/${NAME}`

export type RequestParams = {
  id: string
  where?: Where
  limit?: number
  offset?: number
  sort?: ToSort<{ name: string }> | undefined
}

export type Result = {
  items: ({ name: string; display?: string } & Partial<Dcdatabase>)[]
  total: number
}
