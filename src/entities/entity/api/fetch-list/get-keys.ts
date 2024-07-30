import { NAME_ONE } from '../../constants/name'
import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [`${NAME_ONE}.fetchList`, requestData]
}
