import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { OperationalTable, UpdateOperationalTable } from '../../types/operational-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.update`

export type RequestData = { input: UpdateOperationalTable }

export type ResponseData = OperationalTable
