/* eslint-disable no-console */
import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import * as Picker from './ui.picker'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<string[]>([])

    return (
      <Flex style={{ padding: '2rem' }} gap='6' direction='column' {...state}>
        <Picker.Root value={value} onValueChange={setValue} options={options}>
          <Flex>
            <Picker.ValueList width='50%' />
            <Picker.OptionList width='50%' />
          </Flex>
        </Picker.Root>
      </Flex>
    )
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => Picker.Root.displayName,
} satisfies Story<State>

const options = [
  {
    value: '1',
    display:
      'very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it',
  },
  { value: '2', display: '2' },
  { value: '3', display: '3' },
  { value: '4', display: '4' },
  { value: '5', display: '5' },
  { value: '6', display: '6' },
  { value: '7', display: '7' },
]
