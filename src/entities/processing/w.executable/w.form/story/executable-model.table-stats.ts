import { type ExecutableModel } from '../../models'

export const options = [
  {
    id: 1,
    group: 'Конструктор метрик для столбцов',
    display: 'Кол-во строк',
    value: 'values-count',
    description: 'Это общее количество заполненных значений в столбце. Игнорирует значения NULL.',
    columnTypes: ['string', 'number'],
  },
  {
    id: 2,
    group: 'Конструктор метрик для столбцов',
    display: 'Процент значений',
    value: 'values-percentage',
    description: 'Процент значений в столбце по отношению к числу строк.',
    columnTypes: ['string', 'number'],
  },
  {
    id: 3,
    group: 'Конструктор метрик для столбцов',
    display: 'Количество незаполненных значений',
    value: 'null-count',
    description: 'Количество значений NULL в столбце(пустые).',
    columnTypes: ['string', 'number'],
  },
  {
    id: 4,
    group: 'Конструктор метрик для столбцов',
    display: 'Пропорция незаполненных значений',
    value: 'null-proportion',
    description: 'Показывает отношение значений NULL к общему количеству значений в столбце.',
    columnTypes: ['string', 'number'],
  },
  {
    id: 5,
    group: 'Конструктор метрик для столбцов',
    display: 'Количество дубликатов',
    value: 'duplicate-count',
    description:
      'Передает количество строк с повторяющимися значениями в столбце. Вычисляется как .count(col) - count(distinct(col))',
    columnTypes: ['string', 'number'],
  },
  {
    id: 6,
    group: 'Конструктор метрик для столбцов',
    display: 'Количество уникальных значений',
    value: 'unique-count',
    description:
      'Количество уникальных значений в столбце, которые отображаются только один раз. Например..[1, 2, 2, 3, 3, 4] => [1, 4] => count = 2',
    columnTypes: ['string', 'number'],
  },
  {
    id: 7,
    group: 'Конструктор метрик для столбцов',
    display: 'Пропорция уникальных значений',
    value: 'unique-proportion',
    description: 'Соотношение количества уникальных значений и общего числа записей',
    columnTypes: ['string', 'number'],
  },
  {
    id: 8,
    group: 'Конструктор метрик для столбцов',
    display: 'Количество отличительных значений',
    value: 'distinct-count',
    description:
      'Количество исключительных элементов в столбце. Например..[1, 2, 2, 3, 3, 4] => [1, 2, 3, 4] => count = 4',
    columnTypes: ['string', 'number'],
  },
  {
    id: 9,
    group: 'Конструктор метрик для столбцов',
    display: 'Пропорция отличительных значений',
    value: 'distinct-proportion',
    description: 'Соотношение количества исключительных значений по отношению к общему числу записей.',
    columnTypes: ['string', 'number'],
  },

  {
    id: 12,
    group: 'Конструктор метрик для столбцов',
    display: 'Минимальная длина',
    value: 'min-length',
    description: 'Только для текстовых значений. Возвращает минимальную длину значений в столбце.',
    columnTypes: ['string'],
  },
  {
    id: 13,
    group: 'Конструктор метрик для столбцов',
    display: 'Максимальная длина',
    value: 'max-length',
    description: 'Только для текстовых значений. Возвращает максимальную длину значений в столбце.',
    columnTypes: ['string'],
  },
  {
    id: 14,
    group: 'Конструктор метрик для столбцов',
    display: 'Значения',
    value: 'mean',
    description: 'Текстовые значения: возвращает среднюю длину значений.',
    columnTypes: ['number'],
  },
  {
    id: 10,
    group: 'Конструктор метрик для столбцов',
    display: 'Мин',
    value: 'min',
    description: 'Только для числовых значений. Возвращает минимальное значение.',
    columnTypes: ['number'],
  },
  {
    id: 11,
    group: 'Конструктор метрик для столбцов',
    display: 'Макс',
    value: 'max',
    description: 'Только для числовых значений. Возвращает максимальное значение.',
    columnTypes: ['number'],
  },
  {
    id: 15,
    group: 'Конструктор метрик для столбцов',
    display: 'Медиана',
    value: 'median',
    description: 'Только для числовых значений.',
    columnTypes: ['number'],
  },
  {
    id: 16,
    group: 'Конструктор метрик для столбцов',
    display: 'Сумма',
    value: 'sum',
    description: 'Только для числовых значений. Возвращает сумму всех значений в столбце.',
    columnTypes: ['number'],
  },
  {
    id: 17,
    group: 'Конструктор метрик для столбцов',
    display: 'Стандартное отклонение',
    value: 'standard-deviation',
    description: 'Только для числовых значений. Возвращает стандартное отклонение.',
    columnTypes: ['number'],
  },
  {
    id: 18,
    group: 'Конструктор метрик для столбцов',
    display: 'Первый квартиль',
    value: 'first-quantile',
    description: 'Только для числовых значений. Среднее число между наименьшим значением и медианой',
    columnTypes: ['number'],
  },
  {
    id: 19,
    group: 'Конструктор метрик для столбцов',
    display: 'Третий квартиль',
    value: 'third-quantile',
    description: 'Только для числовых значений. Среднее число между медианой и наибольшим значением',
    columnTypes: ['number'],
  },
  {
    id: 20,
    group: 'Конструктор метрик для столбцов',
    display: 'Межквартильный диапазон',
    value: 'inter-quantile-range',
    description: 'Только для числовых значений. Разница между третьим и первым квартилем',
    columnTypes: ['number'],
  },
]

export const dnpTableStatsExecutableModel: ExecutableModel = {
  name: 'dnp-common/artifacts/procedures/DnpTableStats',
  display: 'Профилирование',
  params: [
    {
      name: 'id',
      display: 'ID расчета',
      getInitialValue: `return 'unknown'`,
      component: {
        name: 'string',
        singleModeProps: {
          readOnly: true,
        },
      },
    },
    {
      name: 'stats',
      display: 'Метрики',
      getInitialValue: `
        const { columns, thisParam, options } = context
        let ret = {}
    
  
        for (let i = 0; i < columns.length; i++) {
          const column = columns[i]
          for (let k = 0; k < thisParam.component.props.options.length; k++) {
            const option = thisParam.component.props.options[k]
            if (option.columnTypes && !option.columnTypes.includes(column.type)) continue
            
            if (ret[column.name]) {
              ret[column.name]?.push(option.value)
            } else {
              ret = { ...ret, [column.name]: [option.value] }
            }
          }
        }
    
        console.log('ret', ret)
        
        return ret
      `,
      component: {
        name: 'Matrix',
        props: {
          serialize: getSerialize(),
          deserialize: getDeserialize(),
          valueType: 'boolean',
          options: options,
        },
      },
    },
  ],
}

function getSerialize() {
  return `
      const { values, columns, walk, options } = context
      let ret = {}
  
      walk((column, option) => {
        ret = {
          ...ret,
          [column.name]: {
            ...ret[column.name],
            [option.value]: values[column.name]?.includes(option.value) || false,
          },
        }
      })
  
      return ret
    `
}

function getDeserialize() {
  return `
      const { values, columns, options, walk } = context
  
      const ret = {} // { [columnName]: optionName[] }
  
      walk((column, option) => {
        if (values[column.name][option.value]) {
          if (ret[column.name]) {
            ret[column.name].push(option.value)
          } else {
            ret[column.name] = [option.value]
          }
        }
      })
  
      return ret
    `
}
