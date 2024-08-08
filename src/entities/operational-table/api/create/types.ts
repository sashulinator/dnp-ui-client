import { NAME_ONE } from '../../constants/name'
import { OperationalTable, CreateOperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.create`

export type RequestData = { input: CreateOperationalTable }

export type ResponseData = OperationalTable
