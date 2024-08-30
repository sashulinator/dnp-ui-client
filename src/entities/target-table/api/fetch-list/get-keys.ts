import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [`${uncapitalize(unspace(ENTITY_NAME))}.fetchList`, requestData]
}
