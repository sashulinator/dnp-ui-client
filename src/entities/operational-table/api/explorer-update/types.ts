import { NAME_ONE } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.explorerUpdate`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Record<string, string> }

export type ResponseData = OperationalTable
