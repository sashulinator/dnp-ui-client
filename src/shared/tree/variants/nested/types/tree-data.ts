import { Id } from '~dnp/utils/core'

import { TreeItem as UiTreeItem } from '../../../types/tree-data'

export type TreeData<TData> = {
  rootId: Id
  items: Record<Id, TreeItem<TData>>
}

export type TreeItem<TData> = UiTreeItem<TData> & {
  parent?: UiTreeItem<TData>
  tree: TreeData<TData>
}
