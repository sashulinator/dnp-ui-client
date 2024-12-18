export type Proccessing = {
  name: string
  outputDcdatabaseId: string
  outputTable: string
  inputDcdatabaseId: string
  configs: Config[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Config = {
  inputTable: string
}
