import { Provider, Viewport } from '@radix-ui/react-toast'

import { useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import Toast, { displayName } from '../ui/toast'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [open, setOpen] = useState(false)

    return (
      <div style={{ padding: '2rem' }}>
        <button onClick={() => setOpen(!open)}>open</button>
        <Provider>
          <Viewport>
            <Toast {...state} open={open} onOpenChange={() => setOpen(false)} />
            <Toast {...state} open={open} onOpenChange={() => setOpen(false)} />
            <Toast {...state} open={open} onOpenChange={() => setOpen(false)} />
          </Viewport>
        </Provider>
      </div>
    )
  },

  controls: [
    // {
    //   name: 'name',
    //   input: 'input',
    //   defaultValue: '',
    // },
    // {
    //   name: 'name',
    //   input: 'select',
    //   options: [],
    //   defaultValue: '',
    // },
    // { name: 'name', input: 'checkbox', defaultValue: false },
  ],

  getName: (): string => displayName,
} satisfies Story<State>
