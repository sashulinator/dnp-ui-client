import { SYSNAME } from '../../constants/name'
import type { TargetTable, UpdateTargetTable } from '../../types/target-table'

export const keyName = `${SYSNAME}.update`

export type RequestData = { input: UpdateTargetTable }

export type ResponseData = TargetTable
