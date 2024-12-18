/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'

import Flex from '~/shared/flex'
import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'
import { emptyFn } from '~/utils/function'

import { type ExecutableDesign } from '../../models'
import Factory from '../../w.field-factory/ui.field-factory'
import ExecutableForm from '../ui.form'
import { columns, firstNameColumn } from './columns'
import { dnpTableStatsExecutableDesign, options } from './executable-model.table-stats'
import { testExecutableDesign } from './executable-model.test1'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const FORM = 'configs[0].executables[0]'
    const form = useCreateForm(
      {
        onSubmit: (value) => {
          // eslint-disable-next-line no-console
          console.log('value', value)
        },
        initialValues: initialValues,
      },
      {
        values: true,
      },
    )

    return (
      <div style={{ padding: '2rem' }}>
        <Form
          form={form}
          component={useCallback(() => {
            return (
              <Flex direction='column'>
                <ExecutableForm
                  onNameChange={emptyFn}
                  name={`${FORM}`}
                  executableDesigns={executableDesigns}
                  {...state}
                />
                <Factory
                  setMultyValue={(value, name) => {
                    const configs = form.getState().values.configs
                    configs.forEach((_, i) => {
                      const targetName = name.replaceAll(/configs\[\d+\]/g, `configs[${i}]`)
                      form.change(targetName as any, value)
                    })
                  }}
                  isSingleMode={false}
                  executableDesigns={executableDesigns as any}
                  name={FORM}
                  columns={columns}
                />
              </Flex>
            )
          }, [])}
        />
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

  getName: (): string => ExecutableForm.displayName,
} satisfies Story<State>

export const configInitialValues = {
  executables: [
    {
      name: 'dnp-common/artifacts/procedures/DnpTableStats',
      params: {
        id: 'name',
        stats: {
          [firstNameColumn.name]: [options[0].value, options[2].value, options[5].value],
        },
      },
    },
  ],
}

export const configInitialValues2 = {
  executables: [
    {
      name: 'dnp-common/artifacts/procedures/DnpTableStats',
      params: {
        id: 'name',
        stats: {
          [firstNameColumn.name]: [options[5].value],
        },
      },
    },
  ],
}

const initialValues = {
  configs: [configInitialValues, configInitialValues2],
}

export const executableDesigns: ExecutableDesign[] = [dnpTableStatsExecutableDesign, testExecutableDesign]
