import { SYSNAME } from '../../constants/name'
import { DictionaryTable, Row } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.explorerUpdate`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Record<string, string> }

export type ResponseData = {
  dictionaryTable: DictionaryTable
  row: Row
}
