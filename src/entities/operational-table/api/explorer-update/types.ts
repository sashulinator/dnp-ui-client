import { SYSNAME } from '../../constants/name'
import { OperationalTable, Row } from '../../types/operational-table'

export const keyName = `${SYSNAME}.explorerUpdate`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Record<string, string> }

export type ResponseData = {
  operationalTable: OperationalTable
  row: Row
}
