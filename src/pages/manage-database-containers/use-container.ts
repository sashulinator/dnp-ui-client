import { useState } from 'react'

import type { Dcdatabase } from '~/entities/database-container'
import { StringParam, useQueryParam, withDefault } from '~/shared/use-query-params'

export type UseContainerResult = {
  id: string
  database: Dcdatabase.DatabaseValue | undefined
  setDatabase: (value: Dcdatabase.DatabaseValue | undefined) => void
}

export function useContainer() {
  const [dcserviceId, setDcserviceId] = useQueryParam('dcserviceId', withDefault(StringParam, ''))
  const [databaseName, setDatabaseName] = useQueryParam('database', withDefault(StringParam, ''))
  const [databaseDisplay, setDatabaseDisplay] = useState<string>()

  return {
    dcserviceId,
    setDcserviceId,
    database: { name: databaseName, display: databaseDisplay },
    setDatabase,
  }

  // Private

  function setDatabase(database: Dcdatabase.DatabaseValue | undefined) {
    setDatabaseName(database?.name)
    setDatabaseDisplay(database?.display)
  }
}
