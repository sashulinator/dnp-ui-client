import { Process } from '../../types/process'
import { List } from '~/lib/api'
import { StringFilter } from '~/lib/api/types/string-filter'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof Process, boolean>> | undefined
}

export type ResponseData = List<Process>
