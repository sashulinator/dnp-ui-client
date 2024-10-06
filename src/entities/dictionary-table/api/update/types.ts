import { SLICE_NAME } from '../../constants/name'
import type { DictionaryTable, UpdateDictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SLICE_NAME}.update`

export type RequestData = { input: UpdateDictionaryTable }

export type ResponseData = DictionaryTable
