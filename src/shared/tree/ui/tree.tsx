import Tree, {
  RenderItemParams as AtlasianRenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '@atlaskit/tree'

import { ReactNode } from 'react'

import { Id } from '~dnp/utils/core'

import { TreeData, TreeItem } from '../types/tree-data'

export type Path = number[]

type RenderItemParams<TData> = Omit<AtlasianRenderItemParams, 'item'> & {
  item: TreeItem<TData>
}

export interface Props<TData> {
  /** The tree data structure. */
  tree: TreeData<TData> | undefined
  /** Function that will be called to render a single item. */
  renderItem: (item: RenderItemParams<TData>) => ReactNode
  /** Function that will be called when a parent item needs to be expanded. */
  onExpand?: ((itemId: Id, path: Path) => void) | undefined
  /** Function that will be called when a parent item needs to be collapsed. */
  onCollapse?: ((itemId: Id, path: Path) => void) | undefined
  /** Function that will be called when the user starts dragging. */
  onDragStart?: ((itemId: Id) => void) | undefined
  /** Function that will be called when the user finishes dragging. */
  onDragEnd?: ((sourcePosition: TreeSourcePosition, destinationPosition?: TreeDestinationPosition) => void) | undefined
  /** Number of pixel is used to scaffold the tree by the consumer. */
  offsetPerLevel?: number | undefined
  /** Boolean to turn on drag&drop re-ordering on the tree */
  isDragEnabled?: boolean | ((item: TreeItem<TData>) => boolean) | undefined
  /** Boolean to turn on hovering while dragging */
  isNestingEnabled?: boolean | undefined
}

export const NAME = 'ui-Tree'

/**
 * ui-Tree
 */
export default function Component<TData>(props: Props<TData>): JSX.Element {
  const { isNestingEnabled = true, offsetPerLevel = 16, ...treeProps } = props

  return <Tree isNestingEnabled={isNestingEnabled} offsetPerLevel={offsetPerLevel} {...treeProps} />
}

Component.displayName = NAME
