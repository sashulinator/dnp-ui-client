import { Tooltip } from '@radix-ui/themes'

import React from 'react'

import { map } from '~/shared/icon'
import { c } from '~/utils/core'

import { Type } from '../../../../../types/explorer'
import DbIcon from '../../icons/db'
import RowIcon from '../../icons/row'
import TableIcon from '../../icons/table'

export interface Props {
  className?: string | undefined
  value: Type
}

const typeIconMap = {
  postgres: DbIcon,
  row: RowIcon,
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
