import { List } from '~/shared/api'
import { StringFilter } from '~/shared/api/types/string-filter'

import { Process } from '../../types/process'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof Process, boolean>> | undefined
}

export type ResponseData = List<Process>
