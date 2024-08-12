import { Explorer, StoreConfig } from '../../types/explorer'

export type RequestData = {
  paths: string[]
  type: 'jdbc'
  storeConfig: StoreConfig
}

export type ResponseData = Explorer
