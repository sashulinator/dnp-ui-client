import { type Story, Props } from '~/ui/storybook'

import TextField from '../'
import TextHighlighter from '../'
import Flex from '~/ui/flex'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex width='100%' p='8' gap='4'>
        <TextHighlighter tooltipContent='name' {...state} size='8'>
          heello
        </TextHighlighter>
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
