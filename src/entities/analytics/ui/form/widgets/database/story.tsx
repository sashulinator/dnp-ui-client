import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import Table from '.'
import { tables } from '../schema/story'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const form = useCreateForm<{ dbRos: Record<string, Record<string, Record<string, Record<string, boolean>>>> }>(
      {
        // eslint-disable-next-line no-console
        onSubmit: console.log,
        initialValues: {
          dbRos: {
            shema_users: {
              users: {
                lastname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
                firstname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
              },
              categories: {
                lastname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
                firstname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
              },
            },
            shema_categories: {
              users: {
                lastname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
                firstname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
              },
              categories: {
                lastname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
                firstname: {
                  notEmpty: true,
                  notNull: true,
                  spaces: false,
                },
              },
            },
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
          <Form display='Пользователи' name='dbRos' form={form} schemas={schemas} component={Table} {...state} />
        </Flex>
        {/* <code style={{ whiteSpace: 'pre-wrap', width: '50%' }}>{JSON.stringify(form.getState()?.values, null, 2)}</code> */}
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

  getName: (): string => Table.displayName,
} satisfies Story<State>

const schemas = {
  shema_users: { name: 'shema_users', display: 'shema_Пользователи', tables },
  shema_categories: { name: 'shema_categories', display: 'shema_Категории', tables },
}
