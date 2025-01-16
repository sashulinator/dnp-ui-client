import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import { getColumns } from '../list-table/story.ts/get-columns'
import Input, { type Value } from './ui.input'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, onChange] = useState<Value>({})

    return (
      <div style={{ padding: '2rem' }}>
        <Input
          {...state}
          fetchList={() =>
            new Promise((resolve) => {
              setTimeout(() => {
                const columns = getColumns()

                resolve({
                  items: columns.map((i) => ({ ...i, id: `${i.name}.${i.schema}` })),
                  total: columns.length,
                })
              }, 1000)
            })
          }
          value={value}
          onChange={onChange}
        />

        <Flex direction='column'>
          {Object.values(value).map((item) => {
            return <div key={item.id}>{item.name}</div>
          })}
        </Flex>
      </div>
    )
  },

  controls: [],

  getName: (): string => Input.displayName,
} satisfies Story<State>
