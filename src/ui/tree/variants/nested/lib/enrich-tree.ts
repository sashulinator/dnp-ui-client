import { TreeData as UiTreeData } from '../../../types/tree-data'
import { TreeData } from '../types/tree-data'

export function enrichTree<TData>(tree: UiTreeData<TData>): TreeData<TData> {
  const ret = { ...tree, items: { ...tree.items } } as TreeData<TData>

  Object.values(ret.items).forEach((item) => {
    item.tree = ret
    if (item.id === tree.rootId) return
    item.children.forEach((id) => {
      ret.items[id].parent = item
    })
    return item
  })

  return ret
}
