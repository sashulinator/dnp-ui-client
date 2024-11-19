import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import Column from './'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm<{ lastname: Record<string, boolean> }>(
      {
        // eslint-disable-next-line no-console
        onSubmit: console.log,
        initialValues: {
          lastname: {
            notEmpty: true,
            notNull: true,
            spaces: false,
          },
        },
      },
      {
        values: true,
      },
    )

    return (
      <Flex width='100%' p='8' gap='4' {...state}>
        <Flex width='50%' direction='column' gap='4'>
          <Form
            display='Пользователи'
            name='lastname'
            form={form}
            actions={[
              {
                id: 6767,
                description: 'desc',
                name: 'notEmpty',
                display: 'Не пусто',
                group: 'group',
                isText: false,
                isInt: true,
                isDate: false,
              },
              {
                id: 6767,
                description: 'desc',
                name: 'notNull',
                display: 'не null',
                group: 'group',
                isText: false,
                isInt: true,
                isDate: false,
              },
              {
                id: 6767,
                description: 'desc',
                name: 'spaces',
                display: 'Пробелы в начале',
                group: 'group',
                isText: false,
                isInt: true,
                isDate: false,
              },
            ]}
            component={Column}
            {...state}
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

  getName: (): string => Column.displayName,
} satisfies Story<State>
