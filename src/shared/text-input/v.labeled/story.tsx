import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'

import LabeledTextInput from './ui.labeled'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <LabeledTextInput label='Ваш лабель' {...state}>
          <Flex width='100%' direction='column'>
            <Text color='red'>Здесь могла бы быть ваша ошибка</Text>
            <Text color='green'>Ну или суксес</Text>
          </Flex>
        </LabeledTextInput>
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

  getName: () => LabeledTextInput.displayName as string,
} satisfies Story<State>
