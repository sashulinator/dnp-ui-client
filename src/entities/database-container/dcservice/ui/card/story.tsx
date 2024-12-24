import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import InputCard, { type InputDcservice } from './v.input/ui.input-card'

interface State {}

export default {
  getName: (): string => InputCard.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [modalOpen, setModalOpen] = useState(false)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <InputCard onClick={() => setModalOpen(true)} fetchValue={fetchValue} {...state} value='first' />
        {String(modalOpen)}
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>

async function fetchValue(id: string): Promise<InputDcservice | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(options.find((option) => option.id === id))
    }, 1000)
  })
}

const options = [
  { id: 'first', display: 'Первый сервис', host: '10.12.34.56', port: 5432 },
  { id: 'second', display: 'Второй сервис', host: '10.12.34.43', port: 5432 },
  { id: 'third', display: 'Третий сервис', host: '10.12.34.36', port: 5432 },
]
