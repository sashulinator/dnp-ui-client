import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Button from '..'

interface State {}

export default {
  getName: (): string => Button.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex direction={'column'} p='8' gap='4'>
        <Button {...state} />
      </Flex>
    )
  },

  controls: [
    {
      input: 'TextInput',
      defaultValue: 'Button',
      path: ['children'],
      label: 'Текст',
    },
    {
      input: 'Switch',
      defaultValue: false,
      path: ['round'],
      label: 'round',
    },
    {
      input: 'Switch',
      defaultValue: false,
      path: ['square'],
      label: 'square',
    },
  ],
} satisfies Story<State>
