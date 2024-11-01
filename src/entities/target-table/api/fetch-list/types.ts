import { List } from '~/shared/api'
import { StringFilter } from '~/shared/api/types/string-filter'

import { TargetTable } from '../../types/target-table'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
    nav?: boolean | undefined
  }
  select?: Partial<Record<keyof TargetTable, boolean>> | undefined
}

export type ResponseData = List<TargetTable>
