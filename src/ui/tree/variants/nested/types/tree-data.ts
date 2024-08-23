import { TreeItem as UiTreeItem } from '../../../types/tree-data'
import { Id } from '~/utils/core'

export type TreeData<TData> = {
  rootId: Id
  items: Record<Id, TreeItem<TData>>
}

export type TreeItem<TData> = UiTreeItem<TData> & {
  parent?: UiTreeItem<TData>
  tree: TreeData<TData>
}
