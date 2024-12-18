/* eslint-disable no-console */
import { useState } from 'react'

import { SelectMultiple as SelectMultipleField, TypedField, useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'

import Button from '../button'
import Form from '../form'
import SelectMultiple from './ui.select-multiple'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<string[]>()

    const form = useCreateForm({
      onSubmit: console.log,
      initialValues: { hello: '["1"]' },
    })

    return (
      <div style={{ padding: '2rem' }}>
        <SelectMultiple
          onValueChange={setValue}
          value={value}
          options={[
            {
              value: '1',
              display:
                'very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it',
            },
            { value: '2', display: '2' },
            { value: '3', display: '3' },
            { value: '4', display: '4' },
            { value: '5', display: '5' },
            { value: '6', display: '6' },
            { value: '7', display: '7' },
          ]}
          {...state}
        />
        <Form form={form}>
          {() => {
            return (
              <TypedField
                name='hello'
                component={SelectMultipleField}
                options={[
                  {
                    value: '1',
                    display:
                      'very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it very-long-name-to-test-how-handle-it',
                  },
                  { value: '2', display: '2' },
                  { value: '3', display: '3' },
                  { value: '4', display: '4' },
                  { value: '5', display: '5' },
                  { value: '6', display: '6' },
                  { value: '7', display: '7' },
                ]}
              />
            )
          }}
        </Form>
        <Button onClick={form.submit}> submit</Button>
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

  getName: (): string => SelectMultiple.displayName,
} satisfies Story<State>
