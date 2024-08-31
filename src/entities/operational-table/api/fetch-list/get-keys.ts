import { SYSNAME } from '../../constants/name'
import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [`${SYSNAME}.fetchList`, requestData]
}
