import { Partial } from '~/utils/types/object'

import { BaseStoreConfig, CreateStoreConfig } from '../../../types/store-config'

type FormStoreConfig = CreateStoreConfig & Partial<BaseStoreConfig, 'deep'>

export type Values = FormStoreConfig
