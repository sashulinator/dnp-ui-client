import { TextField } from '@radix-ui/themes'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Input from './ui.base'

interface State {}

export default {
  getName: (): string => 'input-base',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Input {...state} variant='soft'>
          Контент
        </Input>
        текст инпут для сравнения ниже
        <TextField.Root variant='soft' />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
