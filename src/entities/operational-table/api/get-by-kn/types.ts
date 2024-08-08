import { NAME_ONE } from '../../constants/name'
import { type OperationalTable } from '../../types/operational-table'

export const keyName = `${NAME_ONE}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof OperationalTable, boolean>> | undefined
}

export type ResponseData = OperationalTable
