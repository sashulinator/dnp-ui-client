import { List } from '~/shared/api'
import { StringFilter } from '~/shared/api/types/string-filter'

import { OperationalTable } from '../../types/operational-table'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
    nav?: boolean | undefined
  }
  select?: Partial<Record<keyof OperationalTable, boolean>> | undefined
}

export type ResponseData = List<OperationalTable>
