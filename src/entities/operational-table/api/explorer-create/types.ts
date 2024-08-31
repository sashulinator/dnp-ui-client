import { SYSNAME } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${SYSNAME}.explorerCreate`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = OperationalTable
