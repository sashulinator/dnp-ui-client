import { type Story, type Props } from '~/ui/storybook'

import ToastList from '../ui/list'
import { notify } from '~/shared/notification-list-store'
import { generateId } from '~/utils/core'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <button onClick={() => notify({ title: `id: ${generateId()}` })}>add toast</button>
        <ToastList {...state} />
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

  getName: (): string => ToastList.displayName,
} satisfies Story<State>
