import Tree, { RenderItemParams, TreeItem, enrichTree } from '../'
import { TreeData as UiTreeData } from '../../../types/tree-data'
import Flex from '~/ui/flex'
import Icon from '~/ui/icon'
import { type Story, Props } from '~/ui/storybook'
import { Id } from '~/utils/core'
// import { map } from '~/utils/dictionary'
import { emptyFn } from '~/utils/function'

interface State {}

const HEIGHT = 48

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <div>
          <Tree
            isNestingEnabled={true}
            onExpand={emptyFn}
            onCollapse={emptyFn}
            offsetPerLevel={HEIGHT}
            tree={enrichTree(treeWithTwoBranches)}
            {...state}
            renderItem={_Item}
          />
        </div>
      </Flex>
    )
  },
  getName: (): string => 'ui-Tree',
  controls: [],
} satisfies Story<State>

/**
 * Privar
 */

function _Item(props: RenderItemParams<Data>) {
  const { item, provided } = props

  const allChildren = getChildren(item, item.tree.items)

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Flex style={{ background: '#333', height: HEIGHT }}>
        <Flex
          className='icon'
          style={{ height: HEIGHT, width: HEIGHT, position: 'relative' }}
          align='center'
          justify='center'
        >
          {item.parent && (
            <div
              style={{
                background: 'blue',
                position: 'absolute',
                height: '2px',
                width: HEIGHT + HEIGHT / 4,
                left: -HEIGHT + HEIGHT / 2,
              }}
            />
          )}
          {item.parent && item.parent?.children[item.parent?.children.length - 1] !== item.id && (
            <div
              style={{
                top: (HEIGHT / 2) * -1,
                background: 'blue',
                position: 'absolute',
                height: (allChildren.length + 1) * HEIGHT,
                width: '2px',
                right: HEIGHT + HEIGHT / 2,
              }}
            />
          )}
          {!item.children.length && (
            <div
              style={{
                top: (HEIGHT / 2) * -1,
                background: 'blue',
                position: 'absolute',
                height: HEIGHT,
                width: '2px',
                right: HEIGHT + HEIGHT / 2,
              }}
            />
          )}
          <Icon name='ChevronDown' />
        </Flex>
        <Flex className='icon' style={{ height: HEIGHT, width: HEIGHT }} align='center' justify='center'>
          <Icon name='Star' />
        </Flex>
        <Flex className='title' style={{ height: HEIGHT }} align='center'>
          {item.data?.title}
        </Flex>
      </Flex>
    </div>
  )
}

function getChildren(item: TreeItem<Data>, tree: Record<Id, TreeItem<Data>>): TreeItem<Data>[] {
  const result: TreeItem<Data>[] = [item] // Добавляем исходный элемент в результат
  for (const childId of item.children) {
    if (tree[childId]) {
      result.push(...getChildren(tree[childId], tree))
    }
  }
  return result
}

type Data = { title: string }

const treeWithTwoBranches: UiTreeData<Data> = {
  rootId: '0',
  items: {
    '0': {
      id: '0',
      children: ['1'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: '0',
      },
    },
    '1': {
      id: '1',
      children: ['1-1', '1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: '1',
      },
    },
    '1-1': {
      id: '1-1',
      children: ['1-1-1', '1-1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: '1-1',
      },
    },
    '1-2': {
      id: '1-2',
      children: ['1-2-1', '1-2-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: '1-2',
      },
    },
    '1-1-1': {
      id: '1-1-1',
      children: [],
      hasChildren: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hasSibling: true,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: '1-1-1',
      },
    },
    '1-1-2': {
      id: '1-1-2',
      children: ['1-1-2-1'],
      hasChildren: false,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: '1-1-2',
      },
    },
    '1-1-2-1': {
      id: '1-1-2-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: '1-1-2-1',
      },
    },
    '1-2-1': {
      id: '1-2-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: '1-2-1',
      },
    },
    '1-2-2': {
      id: '1-2-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: '1-2-2',
      },
    },
  },
}
