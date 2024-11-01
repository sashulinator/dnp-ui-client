import { useState } from 'react'

import Flex from '~/shared/flex'
import type { Props } from '~/shared/storybook'
import { type Story } from '~/shared/storybook'

import TextField from '..'
import Pagination from '..'

interface State {}

export default {
  getName: (): string => TextField.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [page, setPage] = useState(1)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        <Pagination
          limit='10'
          currentPage={page}
          root={{ style: { border: '1px solid red' } }}
          onChange={setPage}
          totalElements='100'
          {...state}
        />
      </Flex>
    )
  },

  controls: [],
} satisfies Story<State>
