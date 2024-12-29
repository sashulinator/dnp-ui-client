import { useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import Calendar from './ui.calendar'

interface State {
  //
}
type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]
export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<Value>(null)

    return (
      <div style={{ padding: '2rem' }}>
        <Calendar {...state} value={value} onChange={setValue} />
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

  getName: (): string => Calendar.displayName,
} satisfies Story<State>
