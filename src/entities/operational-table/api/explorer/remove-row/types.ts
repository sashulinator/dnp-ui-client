import { SYSNAME } from '../../../constants/name'
import { OperationalTable } from '../../../types/operational-table'

export const keyName = `${SYSNAME}.explorerDelete`

export type RequestData = { kn: string; where: Record<string, unknown> }

export type ResponseData = OperationalTable
