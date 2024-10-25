import Flex from '~dnp/shared/flex'
import { type Props, type Story } from '~dnp/shared/storybook'

import TextField from '..'
import Info from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Info totalElements='10' totalPages='100' {...state} style={{ border: '1px solid red' }} />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
