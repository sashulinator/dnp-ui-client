import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['sourceConfigs.getByKeyName', requestData.keyName]
}
