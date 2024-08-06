import { NAME_ONE } from '../../constants/name'
import { TargetTable, UpdateTargetTable } from '../../types/target-table'

export const keyName = `${NAME_ONE}.update`

export type RequestData = { input: UpdateTargetTable }

export type ResponseData = TargetTable
