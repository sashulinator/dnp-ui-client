import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import LinkMenu, { NAME } from './ui.link-menu'

interface State {}

export default {
  getName: (): string => NAME,

  render: function Element(props: Props<State>): JSX.Element {
    console.log('props', props)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <LinkMenu />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
