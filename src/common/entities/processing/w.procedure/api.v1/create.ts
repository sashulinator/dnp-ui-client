import type { Procedure, ProcedureCreateInput } from '../models'
import { baseUrl } from './constants'

export const NAME = 'create'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: ProcedureCreateInput
}

export type Result = Procedure
