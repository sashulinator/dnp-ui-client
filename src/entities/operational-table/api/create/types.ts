import { SYSNAME } from '../../constants/name'
import { CreateOperationalTable, OperationalTable } from '../../types/operational-table'

export const keyName = `${SYSNAME}.create`

export type RequestData = { input: CreateOperationalTable }

export type ResponseData = OperationalTable
