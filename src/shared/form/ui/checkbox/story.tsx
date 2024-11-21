import { type Props, type Story } from '~/shared/storybook'

import { useCreateForm } from '../../lib/use-create-form'
import Form from '../form'
import Checkbox from './ui/checkbox'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({
      initialValues: {
        story: true,
      },
      onSubmit: console.log,
    })

    return (
      <div style={{ padding: '2rem' }}>
        <Form form={form}>
          {() => {
            return <Checkbox name='story' {...state} />
          }}
        </Form>
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

  getName: (): string => Checkbox.displayName,
} satisfies Story<State>
