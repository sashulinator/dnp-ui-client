// TODO: убрать common
import { type Action } from '~/common/entities/analytics'

export const analyticalActions: Action[] = [
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
