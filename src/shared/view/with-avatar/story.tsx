import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import InputCard from './ui.with-avatar'

interface State {}

export default {
  getName: (): string => 'ui-view-with-avatar',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [modalOpen, setModalOpen] = useState(false)

    return (
      <Flex width='100%' {...state} direction={'column'} p='8' gap='4'>
        <Flex>
          <button onClick={() => setModalOpen((s) => !s)}>loading</button>
        </Flex>
        <InputCard title='title' loading={modalOpen} subtitle='subtitle' iconName='Postgres' />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
