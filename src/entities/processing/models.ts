export type Proccessing = {
  name: string
  outputDcdatabaseId: string
  outputTable: string
  inputDcdatabaseId: string
  configs: Config[]
}

export type Config = {
  inputTable: string
  executables: Executable[]
}

export type Executable = {
  name: string
  params?: Record<string, unknown> | undefined
}
