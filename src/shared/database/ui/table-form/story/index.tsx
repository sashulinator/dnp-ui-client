import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import DatabaseTableForm, { NAME } from '../ui/table-form'

interface State {
  //
}

export default {
  render: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const form = useCreateForm(
      {
        initialValues: {
          columns: [
            {
              id: 'id1',
              key: 'name1',
              name: 'Название1',
              type: 'строка',
              relation: { table: 'tableName', key: 'key' },
            },
            {
              id: 'id2',
              key: 'name2',
              name: 'Название2',
              type: 'строка',
              relation: { table: 'tableName', key: 'key' },
            },
          ],
        },
        // eslint-disable-next-line no-console
        onSubmit: console.log,
      },
      { values: true, initialValues: true },
    )

    const fState = form.getState()

    return (
      <Flex width='100%' p='8' gap='4' {...state}>
        <Flex width='50%' direction='column' gap='4'>
          <FForm
            form={form}
            render={() => {
              return (
                <DatabaseTableForm
                  primaryRequired={true}
                  fieldNames={{
                    table: 'tableName',
                    columns: 'columns',
                    tableDisplay: 'name',
                    description: 'description',
                  }}
                  strings={{
                    table: 'Тех. название',
                    columns: 'Колонки',
                    tableDisplay: 'Название',
                    description: 'Описание',
                  }}
                />
              )
            }}
            name='story'
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

  getName: (): string => NAME,
} satisfies Story<State>
