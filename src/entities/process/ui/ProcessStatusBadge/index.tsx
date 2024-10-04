import Badge from '~/shared/badge'

type ProcessStatus = 'SUCCESS' | 'STARTED' | 'ERROR'

const statusValuesMap: Record<ProcessStatus, string> = {
  SUCCESS: 'Успешно',
  STARTED: 'Запущен',
  ERROR: 'Ошибка',
}

const statusColorsMap: Record<ProcessStatus, 'green' | 'blue' | 'red'> = {
  SUCCESS: 'green',
  STARTED: 'blue',
  ERROR: 'red',
}

interface Props {
  status: ProcessStatus
}

export const ProcessStatusBadge = ({ status }: Props) => {
  return <Badge color={statusColorsMap[status]}>{statusValuesMap[status]}</Badge>
}
