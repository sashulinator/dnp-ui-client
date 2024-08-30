import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { CreateTargetTable, TargetTable } from '../../types/target-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.create`

export type RequestData = { input: CreateTargetTable }

export type ResponseData = TargetTable
