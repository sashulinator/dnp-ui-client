type _Item<T extends Record<string, unknown>> = Record<
  string,
  {
    id: string
    name: string
    display: string
  } & T
>

export type Columns = _Item<{
  actions: _Item<{ isDate: boolean }>
}>

export type Tree = {
  services: {
    [id: string]: {
      id: string
      display: string
      host: string
      port: string
      username: string
      password: string
      databases: _Item<{
        schemas: _Item<{
          tables: _Item<{
            columns?: Columns
          }>
        }>
      }>
    }
  }
}

export type Values = {
  [serviceId: string]: {
    [databaseId: string]: {
      [schemaId: string]: {
        [tableId: string]: {
          [columnId: string]: {
            [actionId: string]: boolean
          }
        }
      }
    }
  }
}
