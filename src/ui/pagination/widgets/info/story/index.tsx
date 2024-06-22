import { type Story, Props } from '~/ui/storybook'

import TextField from '..'
import Info from '..'
import Flex from '~/ui/flex'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Info totalElements='10' totalPages='100' {...state} root={{ style: { border: '1px solid red' } }} />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
