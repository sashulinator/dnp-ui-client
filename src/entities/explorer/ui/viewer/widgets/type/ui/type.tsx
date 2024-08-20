import { Tooltip } from '@radix-ui/themes'
import React from 'react'
import { Type } from '../../../../../types/explorer'
import JdbcIcon from '../../icons/jdbc'
import RowIcon from '../../icons/row'
import TableIcon from '../../icons/table'
import { map } from '~/ui/icon'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  value: Type
}

const typeIconMap = {
  jdbc: JdbcIcon,
  record: RowIcon,
  s3: map['Star'],
  table: TableIcon,
}

export const NAME = 'explorer-Viewer-w-Type'

/**
 * explorer-Viewer-w-Type
 */
export default function Component(props: Props): JSX.Element {
  const { value: type } = props

  const renderIcon = typeIconMap[type]

  return (
    <Tooltip delayDuration={700} content={type}>
      {React.createElement(renderIcon, { className: c(props.className, NAME) })}
    </Tooltip>
  )
}

Component.displayName = NAME
