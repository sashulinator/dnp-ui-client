import { generateId } from '~dnp/utils/core'
import type { Partial } from '~dnp/utils/types/object'

import { type CreateTargetTable } from '../../../types/target-table'

export const defaultValues: Partial<CreateTargetTable, 'deep'> = {
  nav: false,
  defaultView: 'table',
  columns: [
    {
      id: generateId(3),
      type: 'string',
    },
  ],
}
