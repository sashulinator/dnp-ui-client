export type ExecutableParamModel = {
  name: string
  display: string
  // тело функции
  getInitialValue?: string
  component: {
    name: string
    props?: Record<string, unknown> | undefined
    singleModeProps?: Record<string, unknown> | undefined
  }
}

export type ExecutableModel = {
  name: string
  display: string
  params: ExecutableParamModel[]
}

export type Executable = {
  name: string
  params: Record<string, unknown>
}
