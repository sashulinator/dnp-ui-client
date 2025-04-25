import type { Dccolumn, DccolumnCreateInput, DccolumnUpdateInput } from '../types'
import { URL } from './constants'

export const NAME = 'upsert-by-locator'

export const url = `${URL}/${NAME}`

export type RequestParams = {
  input: DccolumnCreateInput | DccolumnUpdateInput
}

export type Result = Dccolumn
