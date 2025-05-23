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
          <button
            onClick={() => setValue({ name: 'namenamenamenamenamename', display: 'displaydisplaydisplaydisplay' })}
          >
            set value
          </button>
        </Flex>
        <Input
          {...state}
          fetchValue={() => value}
          fetcherDependencies={[value]}
          onClearableClick={() => setValue(undefined)}
        />
      </Flex>
    )
  },

  controls: [],

  getName: (): string => Input.displayName,
} satisfies Story<State>
