import { SYSNAME } from '../../constants/name'
import { DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.explorerCreate`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = DictionaryTable
