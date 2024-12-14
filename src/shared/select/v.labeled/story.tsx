import { type Props, type Story } from '~/shared/storybook'

import SelectInput from './ui.labeled'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <SelectInput {...state} options={options} label='Ваш лабель' />
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

  getName: (): string => SelectInput.displayName,
} satisfies Story<State>

const options = [
  { value: 'a', display: 'A' },
  { value: 'b', display: 'B' },
  { value: 'c', display: 'C' },
  { value: 'd', display: 'D' },
  { value: 'e', display: 'E' },
  { value: 'f', display: 'F' },
]
