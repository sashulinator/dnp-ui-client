import { useMemo } from 'react'

import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'

import RunForm from '../ui/run-form'
import { analyticalActions } from './analytycal-actions'
import { flatTableList } from './flat-table-list'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const initialValues = useMemo(() => RunForm.buildInitialValues(flatTableList, analyticalActions), [])
    const tree = useMemo(() => RunForm.buildTree(flatTableList, analyticalActions), [])

    const form = useCreateForm(
      {
        onSubmit: (value) => {
          // eslint-disable-next-line no-console
          console.log('value', value)
        },
        initialValues,
      },
      {
        values: true,
      },
    )

    return (
      <div style={{ padding: '2rem' }}>
        <Form form={form}>
          {() => {
            return <RunForm tree={tree} {...state} />
          }}
        </Form>
        <pre>
          <Text size='1'>{JSON.stringify(form.getState()?.values, null, 2)}</Text>
        </pre>
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

  getName: (): string => RunForm.displayName,
} satisfies Story<State>
