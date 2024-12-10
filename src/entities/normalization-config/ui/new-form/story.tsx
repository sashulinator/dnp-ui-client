/* eslint-disable no-console */
import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import ProcessingForm from './ui.new-form'
import { type Option } from './widgets/table-multiple'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm({ onSubmit: console.log }, { values: true })
    const fState = form.getState()

    return (
      <Flex width='100%' p='8' gap='4'>
        <Flex width='50%' direction='column' gap='4'>
          <Form form={form} component={ProcessingForm} fetchInputTablesOptions={fetchInputTablesOptions} {...state} />
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

  getName: (): string => ProcessingForm.displayName,
} satisfies Story<State>

function fetchInputTablesOptions(): Promise<Option[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options: Option[] = [
        { value: 'table1', display: 'Таблица-1' },
        { value: 'table2', display: 'Таблица-2' },
        { value: 'table3', display: 'Таблица-3' },
        { value: 'table4', display: 'Таблица-4' },
        { value: 'table5', display: 'Таблица-5' },
        { value: 'table6', display: 'Таблица-6' },
        { value: 'table7', display: 'Таблица-7' },
      ]
      resolve(options)
    }, 1000)
  })
}
