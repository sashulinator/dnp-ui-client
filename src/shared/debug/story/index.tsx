import Button from '~/shared/button'
import { type Props, type Story } from '~/shared/storybook'
import { useForceUpdate } from '~/utils/core-hooks'

import RenderCounter from '../ui/render-counter'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const update = useForceUpdate()

    return (
      <div style={{ padding: '2rem', position: 'relative' }}>
        <Button onClick={update}>update</Button>
        <RenderCounter {...state} />
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

  getName: (): string => RenderCounter.displayName,
} satisfies Story<State>
