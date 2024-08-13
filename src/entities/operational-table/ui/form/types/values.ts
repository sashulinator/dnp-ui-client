import { CreateOperationalTable, BaseOperationalTable } from '../../../types/operational-table'
import { Replace } from '~/utils/types/object'

type FormOperationalTable = CreateOperationalTable & Partial<BaseOperationalTable>

export type Values = Replace<FormOperationalTable, 'tableSchema', string>
