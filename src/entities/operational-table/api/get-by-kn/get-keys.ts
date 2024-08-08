import { keyName } from './types'
import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [keyName, requestData]
}
