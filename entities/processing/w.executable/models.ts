export type ParamComponentDesign = {
  name: string
  props?: Record<string, unknown> | undefined
  serialize?: string | undefined
  deserialize?: string | undefined
  singleModeProps?: Record<string, unknown> | undefined
  multiModeProps?: Record<string, unknown> | undefined
}

export type ParamDesign = {
  name: string
  display: string
  unique?: boolean | undefined
  subscribe?: string | undefined
  // тело функции
  getInitialValue?: string
  component?: ParamComponentDesign
}

export type ExecutableDesign = {
  name: string
  display: string
  params: ParamDesign[]
}

export type Executable = {
  name: string
  params: Record<string, unknown>
}
