import Form, { useCreateForm } from '~/shared/form'
import { type Props, type Story } from '~/shared/storybook'
import Text from '~/shared/text'

import { type Procedure } from '../../models'
import SchemaForm from './ui.schema-form'

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
      },
      {
        values: true,
      },
    )

    return (
      <div style={{ padding: '2rem' }}>
        <Form form={form}>
          {() => {
            return <SchemaForm name={'story'} {...state} procedures={[tableStats]} />
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

  getName: (): string => SchemaForm.displayName,
} satisfies Story<State>

export const tableStats: Procedure = {
  id: 'hello',
  name: 'DnpTableStats',
  display: 'Профилирование',
  description: 'Расчет базовых статистических метрик таблицы',
  params: [
    {
      name: 'id',
      display: 'ID расчета',
      description: 'Идентификатор для отслеживания расчета',
      component: {
        name: 'input',
      },
    },
    /**
     * Параметр не будет отображен в интерфейсе
     * так как у него стоит isIterableTableName=true
     * это означает что в этот параметр будет передано имя таблицы
     */
    {
      name: 'table',
      isIterableTableName: true,
    },
    {
      name: 'stats',
      display: 'Колонка - метрики',
      description: 'Ключ - название колонки, значение - список метрик',
      component: {
        name: 'keyValue',
        props: {
          valueType: 'array',
        },
      },
    },
  ] as any,
}
