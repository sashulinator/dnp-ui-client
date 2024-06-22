import './info.scss'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  totalPages: number | string | undefined
  totalElements: number | string | undefined
  root?: React.HTMLAttributes<HTMLDivElement>
}

const displayName = 'ui-Pagination-w-Info'

/**
 * ui-Pagination-w-Info
 */
export default function Component(props: Props): JSX.Element {
  return (
    <div {...props.root} className={c(props.className, displayName)}>
      <div>страниц: {props.totalPages || '∞'}</div>
      <div>элементов: {props.totalElements || '∞'}</div>
    </div>
  )
}

Component.displayName = displayName
