import Tree, { RenderItemParams, TreeData } from '..'
import Flex from '~/ui/flex'
import Icon from '~/ui/icon'
import { type Story, Props } from '~/ui/storybook'
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
            tree={treeWithTwoBranches}
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

function _Item(props: RenderItemParams) {
  const { item, provided } = props
  console.log('item', props)

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Flex style={{ background: '#333', height: HEIGHT }}>
        <Flex className='icon' style={{ height: HEIGHT, width: HEIGHT }} align='center' justify='center'>
          <Icon name='Star' />
        </Flex>
        <Flex className='icon' style={{ height: HEIGHT, width: HEIGHT }} align='center' justify='center'>
          <Icon name='Star' />
        </Flex>
        <Flex className='title' style={{ height: HEIGHT }} align='center'>
          {item.data.title}
        </Flex>
      </Flex>
    </div>
  )
}

type Data = { title: string }

// function enrichTree(tree: TreeData<Data>) {
//   const items = map(tree.items, (item) => {
//     return item
//   })

//   return {
//     rootId: tree.rootId,
//     items,
//   }
// }

const treeWithTwoBranches: TreeData<Data> = {
  rootId: '1',
  items: {
    '1': {
      id: '1',
      children: ['1-1', '1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'root',
      },
    },
    '1-1': {
      id: '1-1',
      children: ['1-1-1', '1-1-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'First parent',
      },
    },
    '1-2': {
      id: '1-2',
      children: ['1-2-1', '1-2-2'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Second parent',
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
        title: 'Child one',
      },
    },
    '1-1-2': {
      id: '1-1-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child two',
      },
    },
    '1-2-1': {
      id: '1-2-1',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child three',
      },
    },
    '1-2-2': {
      id: '1-2-2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child four',
      },
    },
  },
}
