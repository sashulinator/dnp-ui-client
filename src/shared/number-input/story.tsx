import { type Props, type Story } from '~/shared/storybook'

import Flex from '../flex'
import Icon from '../icon'
import TextInput from './ui.number-input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <TextInput
          clearable={true}
          {...state}
          right={
            <Flex>
              <Icon name='Clear' />
            </Flex>
          }
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

  getName: () => TextInput.displayName as string,
} satisfies Story<State>
