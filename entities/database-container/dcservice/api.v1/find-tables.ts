import type { ToSort } from '~/slices/sort'
import type { Where } from '~/slices/where'

import type { DcdatabaseLocator } from '../../dcdatabase'
import type { Dctable } from '../../dctable'
import { baseUrl } from './constants'

export const NAME = 'find-tables'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  dcdatabaseLocator: DcdatabaseLocator
  where?: Where
  limit?: number
  offset?: number
  sort?: ToSort<{ name: string }>
}

export type Result = {
  items: ({ name: string } & Partial<Dctable>)[]
  total: number
}
