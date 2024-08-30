import { NAME_ONE } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.explorerDelete`

export type RequestData = { kn: string; where: Record<string, unknown> }

export type ResponseData = OperationalTable
