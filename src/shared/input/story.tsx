import { TextField } from '@radix-ui/themes'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'
import { emptyFn } from '~/utils/function'

import Input from './ui.input'

interface State {}

export default {
  getName: (): string => 'input',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Input {...state} variant='soft' onClearableClick={emptyFn}>
          Ghjdthrf
        </Input>
        <TextField.Root variant='soft' />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
