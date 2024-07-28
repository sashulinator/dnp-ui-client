import { Component1Icon, LayersIcon, MinusIcon, RowsIcon } from '@radix-ui/react-icons'
import { Tooltip } from '@radix-ui/themes'
import React from 'react'
import { Type } from '../../../../../types/explorer'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  value: Type
}

export const NAME = 'explorer-Viewer-w-Type'

/**
 * explorer-Viewer-w-Type
 */
export default function Component(props: Props): JSX.Element {
  const { value: type } = props

  const renderIcon =
    type === 'jdbc'
      ? LayersIcon
      : type === 'record'
        ? MinusIcon
        : type === 's3'
          ? Component1Icon
          : type === 'table'
            ? RowsIcon
            : ''

  return (
    <Tooltip delayDuration={700} content={type}>
      {React.createElement(renderIcon, { className: c(props.className, NAME) })}
    </Tooltip>
  )
}

Component.displayName = NAME
