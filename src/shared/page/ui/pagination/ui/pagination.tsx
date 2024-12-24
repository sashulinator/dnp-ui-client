import Flex from '~/shared/flex'
import { c } from '~/utils/core'

import Info from '../widgets/info'
import Switcher from '../widgets/switcher'

export interface Props {
  className?: string | undefined
  root?: React.HTMLAttributes<HTMLDivElement>
  limit: string | number | undefined
  totalElements: number | string | undefined
  currentPage: string | number | undefined
  loading?: boolean | undefined
  onChange: (newPage: number) => void
}

const NAME = 'pagination-Pagination'

/**
 * dnp-pagination-Pagination
 */
export default function Component(props: Props): JSX.Element {
  const totalElements = Number(props.totalElements)
  const limit = Number(props.limit)
  const currentPage = Number(props.currentPage)

  const totalPages = totalElements !== undefined && limit !== undefined ? Math.ceil(totalElements / limit) : undefined

  return (
    <Flex justify='between' align='center' className={c(props.className, NAME)} {...props.root}>
      <Switcher
        loading={props.loading}
        onChange={props.onChange}
        currentPage={currentPage || 1}
        totalPages={totalPages || 1}
      />
      <Info totalElements={totalElements} totalPages={totalPages} />
    </Flex>
  )
}

Component.displayName = NAME
