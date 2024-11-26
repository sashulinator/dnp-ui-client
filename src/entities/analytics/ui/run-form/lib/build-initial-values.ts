import { type Action } from '~/common/entities/analytics'
import { type FlatTable } from '~/entities/database-container'
import { mergeDeep, setPath } from '~/utils/dictionary'

import { type Values } from '../models'

export function buildInitialValues(list: FlatTable[], analyticalActions: Action[]): Values {
  let initialValues = {}

  for (let index = 0; index < list.length; index++) {
    const item = list[index]

    item.columns?.forEach((column) => {
      analyticalActions.forEach((action) => {
        if (column.type === 'string' && !action.isText) return
        if (column.type === 'int' && !action.isInt) return
        initialValues = mergeDeep(
          initialValues,
          setPath(
            initialValues,
            [item.serviceId, item.databaseId, item.schemaId, item.id, column.id, `_${action.id}`],
            true,
          ),
        )
      })
    })
  }

  return initialValues
}
