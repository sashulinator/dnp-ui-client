import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Input, { type Value } from './ui.input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<Value | undefined>()

    return (
      <Flex gap='4' style={{ padding: '2rem', width: '250px' }} direction='column'>
        <Flex>
          <button onClick={() => setValue({ host: '10.11.4.40', port: 3490, client: 'postgres', display: 'workshop' })}>
            set value
          </button>
        </Flex>
        <Input
          {...state}
          hasValue={!!value}
          fetchValue={() => value}
          fetcherDependencies={[value]}
          onClearableClick={() => setValue(undefined)}
        />
      </Flex>
    )
  },

  controls: [],

  getName: (): string => 'dcservice-input',
} satisfies Story<State>
