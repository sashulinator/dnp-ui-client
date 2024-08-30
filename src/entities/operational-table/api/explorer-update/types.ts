import { uncapitalize, unspace } from '~/utils/string'

import { NAME as ENTITY_NAME } from '../../constants/name'
import { OperationalTable } from '../../types/operational-table'

export const keyName = `${uncapitalize(unspace(ENTITY_NAME))}.explorerUpdate`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Record<string, string> }

export type ResponseData = OperationalTable
