import { SYSNAME } from '../../constants/name'
import type { CreateTargetTable, TargetTable } from '../../types/target-table'

export const keyName = `${SYSNAME}.create`

export type RequestData = { input: CreateTargetTable }

export type ResponseData = TargetTable
