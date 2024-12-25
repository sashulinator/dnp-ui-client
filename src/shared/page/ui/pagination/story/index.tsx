import { useState } from 'react'

import Flex from '~/shared/flex'
import type { Props } from '~/shared/storybook'
import { type Story } from '~/shared/storybook'

import Pagination from '..'

interface State {}

export default {
  getName: (): string => Pagination.displayName || '',

  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    return (
      <Flex width='100%' direction={'column'} p='8' gap='4'>
        limit: {limit}
        <Pagination
          limit={limit}
          currentPage={page}
          onLimitChange={setLimit}
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
