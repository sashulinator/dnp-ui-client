import { useState } from 'react'

import { type Props, type Story } from '~/ui/storybook'

import type { Value } from '../ui/sorting-button'
import SortingButton, { NAME } from '../ui/sorting-button'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [value, setValue] = useState<Value>(undefined)

    return (
      <div style={{ padding: '2rem' }}>
        <SortingButton round={true} variant='ghost' {...state} value={value} onChange={setValue} />
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

  getName: (): string => NAME,
} satisfies Story<State>
