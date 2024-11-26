import { type AnalyticalActions } from '~/common/entities/analytics'
import { type FlatTable } from '~/entities/database-container'
import { mergeDeep } from '~/utils/dictionary'

import { type Tree } from '../models'

export function buildTree(list: FlatTable[], analyticalActions: AnalyticalActions[]): Tree {
  let tree = {}

  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    ;(item.columns || [null]).forEach((column) => {
      const newTree = {
        services: {
          [item.serviceId]: {
            id: item.serviceId,
            host: item.serviceHost,
            port: item.servicePort,
            username: item.serviceUsername,
            password: item.servicePassword,
            databases: {
              [item.databaseId]: {
                name: item.databaseName,
                id: item.databaseId,
                display: item.databaseDisplay,
                schemas: {
                  [item.schemaId]: {
                    name: item.schemaName,
                    id: item.schemaId,
                    display: item.schemaDisplay,
                    tables: {
                      [item.id]: {
                        name: item.name,
                        id: item.id,
                        display: item.display,
                        columns:
                          column === null
                            ? null
                            : {
                                [column.id]: {
                                  id: column.id,
                                  name: column.name,
                                  display: column.display,
                                  actions: analyticalActions.reduce((acc, item) => {
                                    // @ts-ignore
                                    acc[`_${item.id}`] = item
                                    return acc
                                  }, {}),
                                },
                              },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }

      tree = mergeDeep(tree, newTree)
    })
  }

  return tree as Tree
}
