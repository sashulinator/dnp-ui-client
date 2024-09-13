import { List } from '~/shared/api'
import { StringFilter } from '~/shared/api/types/string-filter'

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
