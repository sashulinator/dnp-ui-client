import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.explorerDelete`

export type RequestData = { kn: string; where: Record<string, unknown> }

export type ResponseData = OperationalTable
