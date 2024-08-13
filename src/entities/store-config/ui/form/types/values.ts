import { BaseStoreConfig, CreateStoreConfig } from '../../../types/store-config'

type FormStoreConfig = CreateStoreConfig & Partial<BaseStoreConfig>

export type Values = FormStoreConfig
