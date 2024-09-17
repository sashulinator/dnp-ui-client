import { SYSNAME } from '../../constants/name'
import type { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [`${SYSNAME}.fetchList`, requestData]
}
