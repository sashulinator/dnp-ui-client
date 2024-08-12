import { RequestData, keyName } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return [keyName, requestData]
}
