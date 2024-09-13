import { type Props, type Story } from '~/shared/storybook'

import CodeEditor from '..'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <div style={{ padding: '2rem' }}>
        <CodeEditor {...state} />
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

  getName: (): string => CodeEditor.displayName,
} satisfies Story<State>
