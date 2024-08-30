import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { type TargetTable } from '../../types/target-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof TargetTable, boolean>> | undefined
}

export type ResponseData = TargetTable
