import './card.scss'

import { Card, type CardProps } from '@radix-ui/themes'

import { type ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

export interface Props extends CardProps {}

export const NAME = 'dnp-card-Card'

export function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { ...cardProps } = props

  return <Card {...cardProps} ref={ref} className={c(props.className, NAME)} />
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef
