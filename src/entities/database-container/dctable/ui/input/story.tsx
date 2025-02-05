import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import { api } from '../../../dcservice'
import Input, { type Value } from './ui.input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, onChange] = useState<Value | undefined>()

    return (
      <div style={{ padding: '2rem' }}>
        <Input
          {...state}
          fetchTableList={async ({ sort, searchFilter, database, page, limit }) => {
            const ret = await api.findTables.request({
              dcdatabaseLocator: {
                dcserviceId: 'workshop',
                name: database,
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
          fetchDatabaseList={async () => {
            const ret = await api.findDatabases.request({ id: 'workshop' })
            return ret.data
          }}
          fetchDcserviceList={async () => {
            const ret = await api.findWithTotal.request({})
            return ret.data
          }}
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

  getName: (): string => Input.displayName,
} satisfies Story<State>
