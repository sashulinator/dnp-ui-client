import { useState } from 'react'

import Flex from '~/shared/flex'
import Form, { FieldArray, useCreateForm } from '~/shared/form'
import { LabeledSelect } from '~/shared/select'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'

import { initialValues as executableInitialValues, executableModels } from '../w.executable/w.form/story'
import { columns } from '../w.executable/w.form/story/columns'
import ProcessingForm from '../w.executable/w.form/ui.form'

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
          {({ form }) => {
            const values = form.getState()?.values
            const tableOptions = values?.configs.map((c) => ({ display: c.table, value: c.table }))
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [selectedTable, setSelectedTable] = useState(tableOptions[0].value)

            const indexOfSelectedTable = tableOptions.findIndex((t) => t.value === selectedTable)

            return (
              <Flex direction='column' gap='6'>
                <LabeledSelect.default
                  value={selectedTable}
                  onChange={(v) => {
                    setSelectedTable(v.toString())
                  }}
                  options={tableOptions}
                />
                <FieldArray name={`configs[${indexOfSelectedTable}].executables`}>
                  {({ fields }) =>
                    fields.map((name) => {
                      return (
                        <ProcessingForm
                          key={selectedTable}
                          columns={columns}
                          executableModels={executableModels}
                          name={name}
                          {...state}
                        />
                      )
                    })
                  }
                </FieldArray>
              </Flex>
            )
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

  getName: (): string => `${ProcessingForm.displayName}-test`,
} satisfies Story<State>

const firstConfigValue = {
  serviceId: 'storyId',
  database: 'storyDb',
  table: 'storyUsers',
  executables: [
    {
      name: 'dnp-common/artifacts/procedures/DnpTableStats',
      params: executableInitialValues.story.params,
    },
  ],
}

const secondConfigValue = {
  serviceId: 'storyId',
  database: 'storyDb',
  table: 'storySomething',
  executables: [
    {
      name: 'dnp-common/artifacts/procedures/DnpTableStats',
      params: executableInitialValues.story.params,
    },
  ],
}

const initialValues = {
  configs: [firstConfigValue, secondConfigValue],
}
