import { SLICE_NAME } from '../../constants/name'
import type { CreateDictionaryTable, DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SLICE_NAME}.create`

export type RequestData = { input: CreateDictionaryTable }

export type ResponseData = DictionaryTable
