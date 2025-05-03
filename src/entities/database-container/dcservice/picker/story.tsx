import { useCallback, useRef, useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import { api } from '../../dcservice'
import Input from '../input'
import Picker, { type DisplayWithId } from './ui.picker'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [item, onItemChange] = useState<DisplayWithId | undefined>()
    const itemRef = useRef<DisplayWithId | undefined>(undefined)
    itemRef.current = item

    return (
      <div style={{ padding: '2rem', width: '250px' }}>
        <Picker
          {...state}
          fetcherDependencies={[item]}
          enabled={true}
          fetchList={async ({ sort, searchFilter, page, limit }) => {
            const ret = await api.findWithTotal.request({
              sort,
              where: searchFilter as any,
              take: limit,
              skip: (page - 1) * limit,
            })
            return ret.data
          }}
          value={item?.id}
          fetchDisplay={async () => itemRef.current}
          onValueChange={onItemChange}
          renderTrigger={useCallback(({ setIsOpen, value, setValue }) => {
            return (
              <Input
                hasValue={!!value}
                fetchValue={async () => itemRef.current}
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

  getName: (): string => Picker.displayName,
} satisfies Story<State>
