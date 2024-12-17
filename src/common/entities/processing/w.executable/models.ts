export type ExecutableParamDesign = {
  name: string
  display: string
  unique?: boolean | undefined
  subscribe?: string | undefined
  // тело функции
  getInitialValue?: string
  component: {
    name: string
    props?: Record<string, unknown> | undefined
    serialize?: string | undefined
    deserialize?: string | undefined
    singleModeProps?: Record<string, unknown> | undefined
    multiModeProps?: Record<string, unknown> | undefined
  }
}

export type ExecutableDesign = {
  name: string
  display: string
  params: ExecutableParamDesign[]
}

export type Executable = {
  name: string
  params: Record<string, unknown>
}
