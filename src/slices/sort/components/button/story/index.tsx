import { useState } from 'react'

import { type Props, type Story } from '~dnp/shared/storybook'

import type { Value } from '../ui/button'
import Button, { NAME } from '../ui/button'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [value, setValue] = useState<Value>(undefined)

    return (
      <div style={{ padding: '2rem' }}>
        <Button round={true} variant='ghost' {...state} value={value} onChange={setValue} />
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
