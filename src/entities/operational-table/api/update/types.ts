import { SYSNAME } from '../../constants/name'
import { OperationalTable, UpdateOperationalTable } from '../../types/operational-table'

export const keyName = `${SYSNAME}.update`

export type RequestData = { input: UpdateOperationalTable }

export type ResponseData = OperationalTable
