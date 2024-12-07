import { useMemo } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import Icon from '../icon'
import LinkTree from './ui/link-tree'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const lsName = 'story-linktree-expanded'

    const expanded = useMemo(getFromLocalStorage, [])

    return (
      <div style={{ padding: '2rem', border: '1px solid red' }}>
        <LinkTree
          onExpanded={setToLocalStorage}
          expanded={expanded}
          offset={0}
          tree={tree}
          rootProps={{ style: { border: '1px solid blue' } }}
          {...state}
        />
      </div>
    )

    function getFromLocalStorage() {
      const value = localStorage.getItem(lsName)
      try {
        return value ? JSON.parse(value) : {}
      } catch (e) {
        return {}
      }
    }

    function setToLocalStorage(path: string, value: boolean) {
      const expanded = getFromLocalStorage()
      if (value) {
        expanded[path] = value
      } else {
        delete expanded[path]
      }
      localStorage.setItem(lsName, JSON.stringify(expanded))
    }
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => LinkTree.displayName,
} satisfies Story<State>

const tree = [
  {
    id: '1',
    name: 'one',
    renderIcon: () => <Icon name='Star' />,
    link: {
      url: 'https://google.com',
      blank: true,
    },
    children: [],
  },
  {
    id: '2',
    name: 'two',
    renderIcon: () => <Icon name='Star' />,
    children: [
      {
        id: '3',
        name: 'two.one',
        // renderIcon: () => <Icon name='Star' />,
        children: [],
      },
      {
        id: '4',
        name: 'two.two',
        // renderIcon: () => <Icon name='Star' />,
        children: [
          {
            id: '5',
            name: 'two.two.one',
            renderIcon: () => <Icon name='Star' />,
            children: [],
          },
          {
            id: '6',
            name: 'two.two.two',
            renderIcon: () => <Icon name='Star' />,
            children: [],
          },
          {
            id: '10',
            name: 'two.one',
            renderIcon: () => <Icon name='Star' />,
            children: [],
          },
          {
            id: '11',
            name: 'two.one',
            renderIcon: () => <Icon name='Star' />,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '7',
    name: 'tree',
    renderIcon: () => <Icon name='Star' />,
    children: [
      {
        id: '8',
        name: 'tree.one',
        renderIcon: () => <Icon name='Star' />,
        children: [],
      },
      {
        id: '9',
        name: 'tree.two',
        renderIcon: () => <Icon name='Star' />,
        children: [],
      },
    ],
  },
  {
    id: '14',
    name: 'tree',
    renderIcon: () => <Icon name='Star' />,
    children: [
      {
        id: '8',
        name: 'tree.one',
        renderIcon: () => <Icon name='Star' />,
        children: [],
      },
      {
        id: '9',
        name: 'tree.two',
        renderIcon: () => <Icon name='Star' />,
        children: [],
      },
    ],
  },
]
