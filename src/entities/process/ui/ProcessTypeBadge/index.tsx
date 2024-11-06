import Badge from '~/shared/badge'

const typeValuesMap = {
  import: 'Импорт',
  export: 'Экспорт',
  report: 'Отчет',
  normalization: 'Нормализация',
}

const typeColorsMap = {
  import: 'orange',
  export: 'blue',
  report: 'yellow',
  normalization: 'indigo',
}

interface Props {
  type: string
}

export const ProcessTypeBadge = ({ type }: Props) => {
  return <Badge color={typeColorsMap[type as 'import'] as 'orange'}>{typeValuesMap[type as 'import']}</Badge>
}
