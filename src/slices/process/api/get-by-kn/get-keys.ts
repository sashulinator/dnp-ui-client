import { keyName } from './types'
import type { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [keyName, requestData]
}
