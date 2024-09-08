import { SYSNAME } from '../../constants/name'
import { CreateDictionaryTable, DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.create`

export type RequestData = { input: CreateDictionaryTable }

export type ResponseData = DictionaryTable
