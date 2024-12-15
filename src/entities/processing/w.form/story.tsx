import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'

import ProcessingForm, { type ExecutableModel } from './ui.form'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

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
            return <ProcessingForm executableModels={executableModels} name={`configs.0`} {...state} />
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

  getName: (): string => ProcessingForm.displayName,
} satisfies Story<State>

const firstConfig = {
  serviceId: 'storyId',
  database: 'storyDb',
  table: 'storyUsers',
  executables: [
    {
      name: 'dnp-common/artifacts/procedures/DnpTableStats',
      params: [
        {
          name: 'id',
          stats: [
            {
              firstName: ['null-count'],
              secondName: ['null-count'],
              age: ['null-count'],
              sex: ['null-count'],
            },
          ],
        },
      ],
    },
  ],
}

const initialValues = {
  configs: [firstConfig],
}

const executableModels: ExecutableModel[] = [
  {
    name: 'dnp-common/artifacts/procedures/DnpTableStats',
    display: 'Профилирование',
    params: [
      {
        name: 'id',
        display: 'ID расчета',
        component: {
          name: 'string',
        },
      },
    ],
  },
]
