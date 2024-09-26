import postgres from '../widgets/postgres'
import row from '../widgets/row'
import s3 from '../widgets/s3'
import table from '../widgets/table'

export const map = {
  postgres,
  row,
  s3,
  table,
} satisfies Record<string, React.FC<React.SVGAttributes<SVGSVGElement>>>
