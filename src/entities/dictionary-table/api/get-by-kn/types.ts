import { SYSNAME } from '../../constants/name'
import { type DictionaryTable } from '../../types/dictionary-table'

export const keyName = `${SYSNAME}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof DictionaryTable, boolean>> | undefined
}

export type ResponseData = DictionaryTable
