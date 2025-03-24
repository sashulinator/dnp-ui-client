import type { Dccolumn, DccolumnCreateInput, DccolumnUpdateInput } from '../types'
import { baseUrl } from './constants'

export const NAME = 'upsert-by-locator'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: DccolumnCreateInput | DccolumnUpdateInput
}

export type Result = Dccolumn
