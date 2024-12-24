import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Card from '..'

interface State {}

export default {
  getName: (): string => Card.displayName || '',

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
