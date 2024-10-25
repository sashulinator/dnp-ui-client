import Flex from '~dnp/shared/flex'
import { Props, type Story } from '~dnp/shared/storybook'

import TextField from '..'
import Card from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Card {...state}>Card</Card>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
