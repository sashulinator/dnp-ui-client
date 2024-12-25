import Flex from '~/shared/flex'
import Select from '~/shared/select'
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
  onLimitChange?: (newPage: number) => void
  limitOptions?: number[] | undefined
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
    <Flex className={c(props.className, NAME)} {...props.root} justify='between' align='center'>
      <Switcher
        loading={props.loading}
        onChange={props.onChange}
        currentPage={currentPage || 1}
        totalPages={totalPages || 1}
      />
      <Flex gap='2' align='center'>
        {props.onLimitChange && (
          <Select.Root value={String(props.limit)} onValueChange={(value) => props.onLimitChange?.(Number(value))}>
            <Select.Trigger style={{ boxShadow: 'none', color: 'var(--gray-10)' }} />
            <Select.Content>
              <Select.Group>
                {(props.limitOptions || [10, 25, 50, 100]).map((option) => (
                  <Select.Item key={option} value={String(option)}>
                    по {option}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        )}
        <Info totalElements={totalElements} totalPages={totalPages} />
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
