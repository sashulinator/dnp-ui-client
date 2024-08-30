import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { CreateOperationalTable, OperationalTable } from '../../types/operational-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.create`

export type RequestData = { input: CreateOperationalTable }

export type ResponseData = OperationalTable
