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
          renderTrigger={useCallback(({ setIsOpen, value }) => {
            return (
              <Input fetchValue={() => value as any} fetcherDependencies={[value]} onClick={() => setIsOpen(true)} />
            )
          }, [])}
        />
      </div>
    )
  },

  controls: [],

  getName: (): string => Picker.displayName,
} satisfies Story<State>
