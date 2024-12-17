export type Proccessing = {
  name: string
  configs: Config[]
}

export type Config = {
  inputTable: string
  inputDcdatabaseId: string
  outputDcdatabaseId: string
  outputTable: string
}
