import { type Column } from '~/slices/working-table'

import { _idColumn } from '../../../models/_id-column'
import { _statusColumn } from '../../../models/_status-column'

export function enrichSchemaByPrivateColumns(columns: Column[]): Column[] {
  const cloned = [...columns]
  cloned.push(_idColumn)
  cloned.push(_statusColumn)
  return cloned
}
