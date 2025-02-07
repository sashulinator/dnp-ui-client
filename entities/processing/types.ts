import type { DctableLocator } from '../database-container/dctable'

export type Proccessing = {
  name: string
  outputDcdatabaseId: string
  outputTable: string
  configs: Config[]
}

export type Config = {
  inputDctableLocator: DctableLocator
  executables: Executable[]
}

export type Executable = {
  name: string
  params?: Record<string, unknown> | undefined
}
