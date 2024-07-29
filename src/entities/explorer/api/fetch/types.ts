import { Explorer, Path } from '../../types/explorer'
import { JdbcData } from '~/common/store-config'

export type RequestData = {
  paths: Path[]
  storeConfigData: { type: 'jdbc'; data: JdbcData }
}

export type ResponseData = Explorer
