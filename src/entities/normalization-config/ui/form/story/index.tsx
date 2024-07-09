import { useCallback } from 'react'
import Form, { displayName } from '../ui/form'
import Flex from '~/ui/flex'
import FForm, { useCreateForm } from '~/ui/form'
import { type Story, type Props } from '~/ui/storybook'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const render = useCallback(() => <Form {...state} />, [])
    const form = useCreateForm({ onSubmit: console.log }, { values: true })

    return (
      <Flex width='100%' p='8' gap='4'>
        <Flex width='50%'>
          <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          />
        </Flex>
        <code style={{ whiteSpace: 'pre-wrap', width: '50%' }}>{JSON.stringify(form.getState()?.values, null, 2)}</code>
      </Flex>
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
