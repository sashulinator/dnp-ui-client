import { type StoreConfig } from '../../types/store-config'

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof StoreConfig, boolean>> | undefined
}

export type ResponseData = StoreConfig
