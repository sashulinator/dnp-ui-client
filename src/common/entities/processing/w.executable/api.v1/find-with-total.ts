import { type ExecutableDesign } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/find-with-total`

export type RequestParams = {
  skip?: number
  take?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderBy?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select?: any
}

export type Result = {
  items: ExecutableDesign[]
  total: number
}
