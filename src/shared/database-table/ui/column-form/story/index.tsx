import React from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import FForm, { useCreateForm } from '~/shared/form'
import { FieldArray } from '~/shared/form'
import Icon from '~/shared/icon'
import { type Props, type Story } from '~/shared/storybook'
import { generateUniqId } from '~/utils/core'

import { type Column as IColumn } from '../../../models/database-table'
import Column, { NAME } from '../ui/column-form'

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
          story: [
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
                <Flex direction='column' width='100%' wrap='wrap' gap='2'>
                  <FieldArray<IColumn> name={'story'}>
                    {({ fields }) => {
                      return (
                        <>
                          {fields.map((name, index) =>
                            React.createElement(Column, {
                              key: name,
                              name,
                              index,
                              move: fields.move,
                              remove: fields.remove,
                              length: fields.length || 0,
                            }),
                          )}
                          <Button
                            type='button'
                            onClick={() =>
                              fields.push({
                                id: generateUniqId(3, (id) => !fields.value.find((item) => item.id === id)),
                                columnName: '',
                                name: '',
                                type: 'string',
                                maxLength: 50,
                              })
                            }
                            variant='outline'
                          >
                            <Icon name='Plus' />
                          </Button>
                        </>
                      )
                    }}
                  </FieldArray>
                </Flex>
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
