import type { List } from '~/app/api'
import type { StringFilter } from '~/app/api/types/string-filter'

import type { Process } from '../../types/process'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof Process, boolean>> | undefined
  include?: { user?: boolean | undefined } | undefined
}

export type ResponseData = List<Process>
