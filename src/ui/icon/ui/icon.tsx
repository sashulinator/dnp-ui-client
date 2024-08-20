import React from 'react'
import { map } from '../constants/map'

export interface Props extends React.SVGAttributes<SVGSVGElement> {
  name: keyof typeof map
}

export const NAME = 'ui-Icon'

/**
 * ui-Icon
 */
export default function Component(props: Props): JSX.Element {
  const { name, ...svgProps } = props
  return React.createElement(map[name], svgProps)
}

Component.displayName = NAME
