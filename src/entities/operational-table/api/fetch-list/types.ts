import { OperationalTable } from '../../types/operational-table'
import { List } from '~/lib/api'
import { StringFilter } from '~/lib/api/types/string-filter'

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
