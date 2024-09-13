import { useCallback } from 'react'

import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import { toValues } from '../lib/to-values'
import { defaultValues } from '../models/default-values'
import Form, { displayName } from '../ui/form'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const render = useCallback(() => <Form {...state} />, [])

    const form = useCreateForm(
      { initialValues: toValues(defaultValues), onSubmit: console.log },
      { values: true, initialValues: true },
    )

    const fState = form.getState()

    return (
      <Flex width='100%' p='8' gap='4'>
        <Flex width='50%' direction='column' gap='4'>
          <FForm
            form={form}
            // eslint-disable-next-line react-hooks/exhaustive-deps
            render={render}
          />
          <button disabled={!fState.dirty || fState.invalid}>Submit</button>
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
