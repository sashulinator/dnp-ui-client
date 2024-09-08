import { SYSNAME } from '../../constants/name'
import { DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.explorerDelete`

export type RequestData = { kn: string; where: Record<string, unknown> }

export type ResponseData = DictionaryTable
