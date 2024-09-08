import { SYSNAME } from '../../constants/name'
import { DictionaryTable, UpdateDictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.update`

export type RequestData = { input: UpdateDictionaryTable }

export type ResponseData = DictionaryTable
