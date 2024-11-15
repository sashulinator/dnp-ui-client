import { type RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['store.getByName', requestData.name]
}
