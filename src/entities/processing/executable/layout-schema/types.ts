import { type Dcservice } from '~/entities/database-container'

export type Context = {
  context: {
    api: { dcservice: typeof Dcservice.api }
    isSingleMode: boolean
    parentFieldName: string
    columns: { name: string }[]
  }
}

export * from '~/slices/layout-schema/types'
