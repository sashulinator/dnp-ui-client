import { uncapitalize, unspace } from '~/utils/string'

import { Explorer } from '../../../explorer/types/explorer'
import { NAME as ENTITY_NAME } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.explore`

export type RequestData = {
  kn: string
  skip?: number
  take?: number
  searchQuery?: string | undefined
}

export type ResponseData = {
  explorer: Explorer
  operationalTable: OperationalTable
}
