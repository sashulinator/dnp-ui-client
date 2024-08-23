import Tree, { RenderItemParams as AtlasianRenderItemParams } from '@atlaskit/tree'
import { ReactNode } from 'react'
import { Props as TreeProps } from '../../../ui/tree'
import { TreeData, TreeItem } from '../types/tree-data'

export type Path = number[]

export type RenderItemParams<TData> = Omit<AtlasianRenderItemParams, 'item'> & {
  item: TreeItem<TData>
}

export interface Props<TData> extends Omit<TreeProps<TData>, 'tree' | 'renderItem' | 'isDragEnabled'> {
  /** The tree data structure. */
  tree: TreeData<TData> | undefined
  /** Function that will be called to render a single item. */
  renderItem: (item: RenderItemParams<TData>) => ReactNode
  isDragEnabled?: boolean | ((item: TreeItem<TData>) => boolean) | undefined
}

export const NAME = 'ui-Tree-v-Nested'

/**
 * ui-Tree
 */
export default function Component<TData>(props: Props<TData>): JSX.Element {
  const { isNestingEnabled = true, isDragEnabled, renderItem, offsetPerLevel = 16, ...treeProps } = props

  return (
    <Tree
      isNestingEnabled={isNestingEnabled}
      offsetPerLevel={offsetPerLevel}
      {...treeProps}
      // Следующие пропсы перестали подходить по типу
      // так как мы расширяем TreeItem пропсом parent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isDragEnabled={isDragEnabled as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderItem={renderItem as any}
    />
  )
}

Component.displayName = NAME
