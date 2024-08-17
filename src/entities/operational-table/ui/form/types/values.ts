import { CreateOperationalTable, BaseOperationalTable } from '../../../types/operational-table'
import { Update } from '~/utils/types/object'

type FormOperationalTable = CreateOperationalTable & Partial<BaseOperationalTable>

export type Values = Update<FormOperationalTable, 'tableSchema', string>
