import type { DctableLocator } from '../database-container/dctable'

export type Proccessing = {
  name: string
  outputDctableLocator: DctableLocator
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
