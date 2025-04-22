import { useState } from 'react'

import { type Props, type Story } from '~/shared/storybook'

import FackerColConfig from './ui.regexp-functions'

interface State {
  //
}

export default {
  render: function Story(props: Props<State>): JSX.Element {
    const { state } = props

    const [value, setValue] = useState<any[]>([])

    return (
      <div style={{ padding: '2rem' }}>
        <FackerColConfig _paramContext={paramContext as any} value={value} onChange={setValue} {...state} />
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

  getName: (): string => FackerColConfig.displayName,
} satisfies Story<State>

const paramContext = {
  name: 'configs.countries.executables[0].params.col_config',
  columns: [
    {
      name: 'code',
      tableSchema: 'public',
      tableName: 'countries',
      type: 'string',
      maxLength: 255,
      nullable: 'NO',
      defaultValue: null,
      collation: null,
      dbType: 'character varying',
    },
    {
      name: 'name',
      tableSchema: 'public',
      tableName: 'countries',
      type: 'string',
      maxLength: 255,
      nullable: 'YES',
      defaultValue: null,
      collation: null,
      dbType: 'character varying',
    },
    {
      name: 'dial_code',
      tableSchema: 'public',
      tableName: 'countries',
      type: 'string',
      maxLength: 255,
      nullable: 'YES',
      defaultValue: null,
      collation: null,
      dbType: 'character varying',
    },
  ],
  paramSchema: {
    name: 'col_config',
    unique: true,
    display: 'Колонки',
    component: {
      name: 'FackerColConfig',
      props: {
        params: [
          {
            name: 'name',
            component: {
              name: 'string',
            },
          },
          {
            name: 'name',
            component: {
              name: 'Select',
              props: [
                {
                  value: 'integer',
                  display: 'Число',
                },
                {
                  value: 'text',
                  display: 'Текст',
                },
                {
                  value: 'date',
                  display: 'Дата',
                },
                {
                  value: 'datetime',
                  display: 'Дата и время',
                },
              ],
            },
          },
          {
            name: 'semtype',
            component: {
              name: 'select',
              props: [
                {
                  value: 'address.building_number',
                  display: 'Адрес: номер дома',
                },
                {
                  value: 'address.city',
                  display: 'Адрес: город',
                },
                {
                  value: 'address.country',
                  display: 'Адрес: страна',
                },
                {
                  value: 'bank.bank_country',
                  display: 'Банк: страна',
                },
                {
                  value: 'bank.iban',
                  display: 'Банк: IBAN',
                },
                {
                  value: 'bank.swift',
                  display: 'Банк: SWIFT',
                },
              ],
            },
          },
        ],
      },
    },
    getInitialValue: 'return []',
  },
  isSingleMode: true,
}
