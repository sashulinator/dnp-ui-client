import { type Props, type Story } from '~/shared/storybook'
import TextInput from '~/shared/text-input'

import Labeled from './ui.labeled'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <Labeled label='Hello lable' {...state}>
          <TextInput clearable={true} />
        </Labeled>
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

  getName: (): string => Labeled.displayName,
} satisfies Story<State>
