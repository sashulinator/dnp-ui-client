import Flex from '~/shared/flex'
import { Props, type Story } from '~/shared/storybook'

import TextField from '..'
import TextHighlighter from '..'

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
