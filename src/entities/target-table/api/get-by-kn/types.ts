import { NAME_ONE } from '../../constants/name'
import { type TargetTable } from '../../types/target-table'

export const keyName = `${NAME_ONE}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof TargetTable, boolean>> | undefined
}

export type ResponseData = TargetTable
