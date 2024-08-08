import { NAME_ONE } from '../../constants/name'
import { OperationalTable, UpdateOperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.update`

export type RequestData = { input: UpdateOperationalTable }

export type ResponseData = OperationalTable
