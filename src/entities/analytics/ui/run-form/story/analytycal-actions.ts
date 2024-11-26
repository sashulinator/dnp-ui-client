// TODO: убрать common
import { type AnalyticalActions } from '~/common/entities/analytics'

export const analyticalActions: AnalyticalActions[] = [
  {
    id: 1,
    name: 'Count Row',
    display: 'Кол-во строк',
    group: 'Метрики таблиц',
    description: '',
    isText: false,
    isInt: false,
    isDate: false,
  },
]
