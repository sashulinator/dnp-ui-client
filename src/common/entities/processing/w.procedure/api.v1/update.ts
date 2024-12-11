import type { Procedure, ProcedureUdateInput } from '../models'
import { baseUrl } from './constants'

export const NAME = 'update'

export const url = `${baseUrl}/${NAME}`

export type RequestParams = {
  input: ProcedureUdateInput
}

export type Result = Procedure
