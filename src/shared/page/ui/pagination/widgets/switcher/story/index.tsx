import { useState } from 'react'

import Flex from '~dnp/shared/flex'
import type { Props } from '~dnp/shared/storybook'
import { type Story } from '~dnp/shared/storybook'

import TextField from '..'
import Switcher from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [page, setPage] = useState(1)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Switcher
          root={{ style: { border: '1px solid red' } }}
          currentPage={page}
          totalPages={10}
          onChange={setPage}
          {...state}
        />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
