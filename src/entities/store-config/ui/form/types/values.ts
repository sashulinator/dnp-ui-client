import { BaseStoreConfig, CreateStoreConfig } from '../../../types/store-config'
import { Partial } from '~/utils/types/object'

type FormStoreConfig = CreateStoreConfig & Partial<BaseStoreConfig, 'deep'>

export type Values = FormStoreConfig
