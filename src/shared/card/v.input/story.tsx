import { Flex } from '@radix-ui/themes'

import { useState } from 'react'

import Button from '~/shared/button'
import { type Props, type Story } from '~/shared/storybook'

import CardInput from './ui.input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [loading, setLoading] = useState(false)

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setLoading(!loading)}>Загрузка</Button>
        <CardInput {...state} loading={loading}>
          <Flex direction='column'>
            <Flex>Твои дети</Flex>
            <Flex>Твои дети</Flex>
            <Flex>Твои детиТвои детиТвои детиТвои детиТвои детиТвои дети</Flex>
          </Flex>
        </CardInput>
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

  getName: (): string => CardInput.displayName,
} satisfies Story<State>
