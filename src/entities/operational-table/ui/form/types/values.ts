import { CreateOperationalTable, BaseOperationalTable } from '../../../types/operational-table'

type FormOperationalTable = CreateOperationalTable & Partial<BaseOperationalTable>

export type Values = FormOperationalTable
