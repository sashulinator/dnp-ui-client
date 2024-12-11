import type { Procedure, ProcedureUdateInput } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/update`

export type RequestParams = {
  input: ProcedureUdateInput
}

export type Result = Procedure
