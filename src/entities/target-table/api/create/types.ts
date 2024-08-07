import { NAME_ONE } from '../../constants/name'
import { TargetTable, CreateTargetTable } from '../../types/target-table'

export const keyName = `${NAME_ONE}.create`

export type RequestData = { input: CreateTargetTable }

export type ResponseData = TargetTable
