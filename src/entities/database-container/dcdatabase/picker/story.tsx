import { useCallback, useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import { api } from '../../dcservice'
import Input from '../input'
import Picker, { type Value } from './ui.picker'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, onChange] = useState<Value | undefined>()

    return (
      <div style={{ padding: '2rem', width: '250px' }}>
        <Picker
          {...state}
          fetcherDependencies={['test']}
          enabled={true}
          fetchList={async ({ sort, searchFilter, page, limit }) => {
            const ret = await api.findDatabases.request({
              id: 'workshop',
              sort,
              where: searchFilter as any,
              limit,
              offset: (page - 1) * limit,
            })
            return ret.data
          }}
          value={value}
          onChange={onChange}
          renderTrigger={useCallback(({ setIsOpen, value, setValue }) => {
            return (
              <Input
                hasValue={!!value}
                fetchValue={() => value}
                fetcherDependencies={[value]}
                onClearableClick={() => setValue(undefined)}
                onClick={() => setIsOpen(true)}
              />
            )
          }, [])}
        />
      </div>
    )
  },

  controls: [],

  getName: (): string => 'dcdatabase-picker',
} satisfies Story<State>
