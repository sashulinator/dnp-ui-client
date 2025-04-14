import { useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import SelectInput from './ui.input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState('')

    return (
      <div style={{ padding: '2rem' }}>
        <SelectInput
          {...state}
          clearable={true}
          value={value}
          onChange={(v) => setValue(v.toString())}
          options={options}
        />
      </div>
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

  getName: (): string => 'select',
} satisfies Story<State>

const options = [
  { value: 'a', display: 'A' },
  { value: 'b', display: 'B' },
  { value: 'c', display: 'C' },
  { value: 'd', display: 'D' },
  { value: 'e', display: 'E' },
  { value: 'f', display: 'F' },
]
