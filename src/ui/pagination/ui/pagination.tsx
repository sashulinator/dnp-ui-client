import Info from '../widgets/info'
import Switcher from '../widgets/switcher'
import './pagination.scss'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  totalElements: string | undefined
  limit: string | undefined
  currentPage: string | number | undefined
  root?: React.HTMLAttributes<HTMLDivElement>
  onChange: (newPage: number) => void
}

const displayName = 'ui-Pagination'

/**
 * ui-Pagination
 */
export default function Component(props: Props): JSX.Element {
  const totalElements = Number(props.totalElements)
  const limit = Number(props.limit)
  const currentPage = Number(props.currentPage)
  const totalPages = totalElements !== undefined && limit !== undefined ? Math.ceil(totalElements / limit) : undefined

  return (
    <div className={c(props.className, displayName)} {...props.root}>
      <Switcher onChange={props.onChange} currentPage={currentPage || 1} totalPages={totalPages || 1} />
      <Info totalElements={totalElements} totalPages={totalPages} />
    </div>
  )
}

Component.displayName = displayName
