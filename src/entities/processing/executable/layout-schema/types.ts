export type Context = {
  context: { isSingleMode: boolean; parentFieldName: string; columns: { name: string }[] }
}

export * from '~/slices/layout-schema/types'
