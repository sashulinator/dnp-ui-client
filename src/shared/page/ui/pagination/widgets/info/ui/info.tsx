import './info.scss'

import Text, { type TextProps } from '~/shared/text'
import { c } from '~/utils/core'

export type Props = TextProps & {
  className?: string | undefined
  totalPages: number | string | undefined
  totalElements: number | string | undefined
}

const displayName = 'ui-Pagination-w-Info'

/**
 * ui-Pagination-w-Info
 */
export default function Component(props: Props): JSX.Element {
  const { totalPages, totalElements, className, ...textProps } = props

  return (
    <Text size='2' {...textProps} className={c(className, displayName)}>
      страниц {totalPages || '∞'}, элементов {totalElements || '∞'}
    </Text>
  )
}

Component.displayName = displayName
