import { ProcessType, processType } from '~/common/entities/process'
import Badge from '~/shared/badge'

const typeValuesMap: Record<ProcessType, string> = {
  [processType.IMPORT]: 'Импорт',
  [processType.EXPORT]: 'Экспорт',
  [processType.REPORT]: 'Отчет',
  [processType.NORMALIZATION]: 'Нормализация',
}

const typeColorsMap: Record<ProcessType, 'orange' | 'blue' | 'yellow' | 'indigo'> = {
  [processType.IMPORT]: 'orange',
  [processType.EXPORT]: 'blue',
  [processType.REPORT]: 'yellow',
  [processType.NORMALIZATION]: 'indigo',
}

interface Props {
  type: ProcessType
}

export const ProcessTypeBadge = ({ type }: Props) => {
  return <Badge color={typeColorsMap[type]}>{typeValuesMap[type]}</Badge>
}
