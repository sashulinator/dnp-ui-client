import { type RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['normalizationConfig.getByName', requestData.name]
}
