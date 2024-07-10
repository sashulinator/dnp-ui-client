import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['normalizationConfig.getById', requestData.id]
}
