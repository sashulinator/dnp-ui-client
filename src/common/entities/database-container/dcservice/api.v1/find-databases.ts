import type { Where } from '~/slices/where'

import type { Dcdatabase } from '../../models'
import { baseUrl } from './constants'

export const NAME = 'find-databases'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  id: string
  where?: Where
  limit?: number
  offset?: number
}

export type Result = {
  items: ({ name: string; display?: string } & Partial<Dcdatabase>)[]
  total: number
}
