import { useState } from 'react'
import { useParams } from 'react-router-dom'

import type { Dcdatabase } from '~/entities/database-container'
import { StringParam, useQueryParam, withDefault } from '~/shared/use-query-params'

export type UseContainerResult = {
  id: string
  database: Dcdatabase.DatabaseValue | undefined
  setDatabase: (value: Dcdatabase.DatabaseValue | undefined) => void
}

export function useContainer() {
  const { id = '' } = useParams()

  const [databaseName, setDatabaseName] = useQueryParam('database', withDefault(StringParam, ''))
  const [databaseDisplay, setDatabaseDisplay] = useState<string>()

  return {
    id,
    database: { name: databaseName, display: databaseDisplay },
    setDatabase,
  }

  // Private

  function setDatabase(database: Dcdatabase.DatabaseValue | undefined) {
    setDatabaseName(database?.name)
    setDatabaseDisplay(database?.display)
  }
}
