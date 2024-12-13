/* eslint-disable no-console */
import { useState } from 'react'

import Checkbox from '~/shared/checkbox'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'
import { type Dictionary } from '~/utils/core'

import MatrixTable, { type ColumnProps, type Option } from './ui.matrix'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [values, setValues] = useState(initialValues)

    return (
      <div style={{ padding: '2rem' }}>
        <MatrixTable
          {...state}
          columns={columns}
          options={options}
          values={values}
          onValuesChange={setValues}
          renderOptionHeader={() => (
            <Text color='red' weight='regular'>
              Твой кастом
            </Text>
          )}
          renderOptionCell={(props) => props.option.display}
          renderCell={(props) => (
            <Checkbox
              checked={Boolean(props.value)}
              onCheckedChange={(checked) => {
                props.onValueChange(!!checked)
              }}
            />
          )}
        />
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

  getName: (): string => MatrixTable.displayName,
} satisfies Story<State>

const columns = [
  {
    name: 'firstName',
  },
  {
    name: 'secondName',
  },
  {
    name: 'age',
  },
  {
    name: 'sex',
  },
] satisfies ColumnProps<Dictionary, Dictionary>[]

const options = [
  {
    display: 'Процент значений',
    value: 'row-1',
  },
  {
    display: 'Кол-во строк',
    value: 'row-2',
  },
  {
    display: 'Количество дубликатов',
    value: 'row-3',
  },
  {
    display: 'Макс',
    value: 'row-4',
  },
  {
    display: 'Мин',
    value: 'row-5',
  },
  {
    display: 'Медиана',
    value: 'row-6',
  },
  {
    display: 'Сумма',
    value: 'row-7',
  },
] satisfies Option[]

const initialValues = {
  [columns[0].name]: { [options[0].value]: true },
  [columns[1].name]: { [options[1].value]: true },
  [columns[2].name]: { [options[1].value]: true },
  [columns[3].name]: { [options[2].value]: true },
}
