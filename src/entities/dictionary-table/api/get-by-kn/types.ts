import { SLICE_NAME } from '../../constants/name'
import { type DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SLICE_NAME}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof DictionaryTable, boolean>> | undefined
}

export type ResponseData = DictionaryTable
