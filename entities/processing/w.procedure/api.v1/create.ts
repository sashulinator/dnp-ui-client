import type { Procedure, ProcedureCreateInput } from '../models'
import { BASE_URL } from './constants'

export const URL = `${BASE_URL}/create`

export type RequestParams = {
  input: ProcedureCreateInput
}

export type Result = Procedure
