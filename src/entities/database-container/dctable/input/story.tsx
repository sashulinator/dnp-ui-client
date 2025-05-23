import { useState } from 'react'

import Flex from '~/shared/flex'
import { type Props, type Story } from '~/shared/storybook'

import Input, { type Props as InputProps, type Value } from './ui.input'

type State = Pick<InputProps, 'disabled'>

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<Value[] | undefined>()

    return (
      <Flex
        gap='4'
        style={{ padding: '2rem', width: '250px', resize: 'horizontal', overflow: 'auto' }}
        direction='column'
      >
        <Flex>
          <button
            onClick={() =>
              setValue((s = []) => [
                ...s,
                { name: 'namenamenamenamenamename', display: 'displaydisplaydisplaydisplay' },
              ])
            }
          >
            set value
          </button>
        </Flex>
        <Input
          {...state}
          fetchValue={async () => value?.[0]}
          fetcherDependencies={[value]}
          onClearableClick={() => setValue(undefined)}
        />
        <Flex direction='column'>
          async
          <Input
            {...state}
            fetchValue={() =>
              new Promise((resolve) => {
                if (!value?.[0]) resolve(undefined)
                setTimeout(() => {
                  resolve(value?.[0])
                }, 1300)
              })
            }
            fetcherDependencies={[value, 'async']}
            onClearableClick={() => setValue(undefined)}
          />
        </Flex>
        <Flex direction='column'>
          async multiselect
          <Input
            {...state}
            fetchValue={() =>
              new Promise((resolve) => {
                if (!value) resolve(undefined)
                setTimeout(() => {
                  resolve(value)
                }, 1300)
              })
            }
            fetcherDependencies={[value, 'async multi']}
            onClearableClick={() => setValue(undefined)}
          />
        </Flex>
      </Flex>
    )
  },

  controls: [
    {
      input: 'Switch',
      defaultValue: false,
      path: ['disabled'],
      label: 'disabled',
    },
    {
      input: 'Switch',
      defaultValue: false,
      path: ['loading'],
      label: 'loading',
    },
  ],

  getName: (): string => Input.displayName,
} satisfies Story<State>
