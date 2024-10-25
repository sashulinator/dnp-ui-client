import { generateId } from '~dnp/utils/core'
import { type Partial } from '~dnp/utils/types/object'

import { type CreateOperationalTable } from '../../../types/operational-table'

export const defaultValues: Partial<CreateOperationalTable, 'deep'> = {
  nav: false,
  defaultView: 'table',
  columns: [
    {
      id: generateId(3),
      type: 'string',
    },
  ],
}
