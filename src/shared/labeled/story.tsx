import { type Props, type Story } from '~/shared/storybook'
import TextInput from '~/shared/text-input'

import Labled from './ui.labeled'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <Labled label='Hello lable' {...state}>
          <TextInput clearable={true} />
        </Labled>
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

  getName: (): string => Labled.displayName,
} satisfies Story<State>
