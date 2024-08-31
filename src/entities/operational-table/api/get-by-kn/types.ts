import { SYSNAME } from '../../constants/name'
import { type OperationalTable } from '../../types/operational-table'

export const keyName = `${SYSNAME}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof OperationalTable, boolean>> | undefined
}

export type ResponseData = OperationalTable
