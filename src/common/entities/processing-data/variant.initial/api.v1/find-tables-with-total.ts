import { baseUrl } from './constants'

export const NAME = 'find-tables-with-total'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  dcdatabaseId: string
  take?: number | undefined
  skip?: number | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any | undefined
  sort?: Record<string, 'asc' | 'desc'> | undefined
}

type Column = { name: string; display: string; type: string }

export type Result = {
  items: { name: string; display: string; schemaName: string; columns: Column[] }[]
  total: number
}
