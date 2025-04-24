import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import { api } from '../../dcservice'
import Input, { type Value } from './ui.picker'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, onChange] = useState<Value | undefined>()

    return (
      <div style={{ padding: '2rem', width: '250px' }}>
        <Input
          {...state}
          enabled={true}
          fetcherDependencies={[]}
          fetchTableList={async ({ sort, searchFilter, page, limit }) => {
            const ret = await api.findTables.request({
              dcdatabaseLocator: {
                dcserviceId: 'workshop',
                name: 'initial',
              },
              sort,
              where: searchFilter as any,
              limit,
              offset: (page - 1) * limit,
            })
            return ret.data
          }}
          value={value}
          onChange={onChange}
        />
        <Flex direction='column'>
          {Object.values(value || {}).map((item) => {
            return <div key={`${item.name}${item.schema}`}>{item.name}</div>
          })}
        </Flex>
      </div>
    )
  },

  controls: [],

  getName: (): string => 'dctable-old-picker',
} satisfies Story<State>
