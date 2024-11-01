import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import LinkMenu, { NAME } from './ui.link-menu'
import type { TreeItem } from './widgets.item'

const icon =
  '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9C3 6.5 4.5 4.25 7.5 1.5C10.5 4.25 12 6.5 12 9C12 11.4853 9.98528 13.5 7.5 13.5C5.01472 13.5 3 11.4853 3 9ZM10.9524 8.30307C9.67347 7.82121 8.2879 8.46208 6.98956 9.06259C5.9327 9.55142 4.93365 10.0135 4.09695 9.82153C4.03357 9.55804 4 9.28294 4 9C4 7.11203 5.02686 5.27195 7.5 2.87357C9.66837 4.97639 10.725 6.65004 10.9524 8.30307Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'

const data: TreeItem[] = [
  {
    icon: icon,
    name: 'Таблицы',
    link: '/tables',
  },
  {
    icon: icon,
    name: 'Таблицы1',
    link: '/tables1',
    children: [
      {
        icon: icon,
        name: 'Таблицы4',
        link: '/tables1',
        children: [
          {
            name: 'Таблицы8',
            link: '/tables1',
          },
          {
            name: 'Таблицы6',
          },
        ],
      },
      {
        name: 'Таблицы5',
        // link: '/tables1',
        children: [
          {
            name: 'Таблицы8',
            link: '/tables1',
          },
          {
            name: 'Таблицы6',
          },
        ],
      },
    ],
  },
  {
    icon: icon,
    name: 'Таблицы2',
    // link: '/tables2',
  },
  {
    icon: icon,
    name: 'Таблицы1',
    link: '/tables1',
    children: [
      {
        icon: icon,
        name: 'Таблицы4',
        link: '/tables1',
        children: [
          {
            name: 'Таблицы8',
            link: '/tables1',
          },
          {
            name: 'Таблицы6',
          },
        ],
      },
      {
        name: 'Таблицы5',
        // link: '/tables1',
        children: [
          {
            name: 'Таблицы81',
            link: '/tables1',
          },
          {
            name: 'Таблицы62',
          },
        ],
      },
    ],
  },
]

interface State {}

export default {
  getName: (): string => NAME,

  render: function Element(props: Props<State>): JSX.Element {
    // eslint-disable-next-line no-console
    console.log('props', props)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        {data.map((item, i) => {
          return <LinkMenu item={item} key={i} />
        })}
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
