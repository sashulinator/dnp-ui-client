import { SYSNAME } from '../../constants/name'
import { type TargetTable } from '../../types/target-table'

export const keyName = `${SYSNAME}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof TargetTable, boolean>> | undefined
}

export type ResponseData = TargetTable
