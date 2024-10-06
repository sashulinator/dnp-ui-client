import { SLICE_NAME } from '../../constants/name'
import type { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [`${SLICE_NAME}.fetchList`, requestData]
}
