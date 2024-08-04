import { TargetTable } from '../../types/target-table'
import { List } from '~/lib/api'
import { StringFilter } from '~/lib/api/types/string-filter'

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
