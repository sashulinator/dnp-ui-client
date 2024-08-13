import { CreateTargetTable, BaseTargetTable } from '../../../types/target-table'

type FormTargetTable = CreateTargetTable & Partial<BaseTargetTable>

export type Values = FormTargetTable
