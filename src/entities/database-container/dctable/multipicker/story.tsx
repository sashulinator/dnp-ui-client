import { useCallback, useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import { api } from '../../dcservice'
import Input from '../input'
import Multipicker, { type Value } from './ui.multipicker'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, onChange] = useState<Value[] | undefined>()

    console.log('value', value)

    return (
      <div style={{ padding: '2rem', width: '250px' }}>
        <Multipicker
          {...state}
          fetcherDependencies={['test']}
          enabled={true}
          fetchTableList={async ({ sort, searchFilter, page, limit }) => {
            const ret = await api.findTables.request({
              dcdatabaseLocator: {
                dcserviceId: 'workshop',
                name: 'target',
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
          renderTrigger={useCallback(({ setIsOpen, setValue, value }) => {
            return (
              <Input
                hasValue={!!value}
                fetchValue={async () => value as any}
                fetcherDependencies={[value]}
                onClick={() => setIsOpen(true)}
                onClearableClick={() => setValue(undefined)}
              />
            )
          }, [])}
        />
      </div>
    )
  },

  controls: [],

  getName: (): string => Multipicker.displayName,
} satisfies Story<State>
