import { List } from '~/lib/api'
import { StringFilter } from '~/lib/api/types/string-filter'

import { DictionaryTable } from '../../types/dictionary-table'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
    nav?: boolean | undefined
  }
  select?: Partial<Record<keyof DictionaryTable, boolean>> | undefined
}

export type ResponseData = List<DictionaryTable>
