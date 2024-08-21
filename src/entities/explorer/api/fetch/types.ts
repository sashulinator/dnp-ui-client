import { Explorer, StoreConfig } from '../../types/explorer'

export type RequestData = {
  paths: string[]
  type: 'postgres' | 's3'
  storeConfig: StoreConfig
}

export type ResponseData = Explorer
