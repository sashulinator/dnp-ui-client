import { NAME_ONE } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.explorerCreate`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = OperationalTable
