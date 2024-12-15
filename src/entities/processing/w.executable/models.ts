export type ExecutableParamModel = {
  name: string
  display: string
  component: {
    name: string
    props?: Record<string, unknown> | undefined
  }
}

export type ExecutableModel = {
  name: string
  display: string
  params: ExecutableParamModel[]
}
