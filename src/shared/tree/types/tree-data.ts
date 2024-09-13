import { Id } from '~/utils/core'

export interface TreeData<TData> {
  rootId: Id
  items: Record<Id, TreeItem<TData>>
}

export type TreeItem<TData> = {
  id: Id
  children: Id[]
  hasChildren?: boolean
  isExpanded?: boolean
  isChildrenLoading?: boolean
  data?: TData
}
