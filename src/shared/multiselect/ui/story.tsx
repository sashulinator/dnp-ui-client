/* eslint-disable no-console */
import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'
import { preventDefault } from '~/utils/core-client'

import * as Multiselect from './multiselect'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<string[]>([])

    return (
      <Flex style={{ padding: '2rem' }} gap='6' direction='column' {...state}>
        <Multiselect.Root onValueChange={setValue} value={value}>
          <Multiselect.Trigger strings={{ selected: 'Выбрано' }} placeholder='hello' />
          <Multiselect.Content>
            {options.map((o) => {
              return (
                <Multiselect.Item key={o.value} value={o.value} onClick={preventDefault}>
                  {o.display}
                </Multiselect.Item>
              )
            })}
          </Multiselect.Content>
        </Multiselect.Root>
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

  getName: (): string => 'Multiselect',
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
