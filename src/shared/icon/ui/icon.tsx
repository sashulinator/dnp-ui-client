import React from 'react'

import type { IconName } from '../constants/map'
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

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  iconName: IconName | string
}

/**
 * ui-Icon-render
 */

export function _renderIcon(props: IconProps) {
  const { iconName, ...svgProps } = props
  if (iconName in map) {
    return React.createElement(map[iconName as IconName], svgProps)
  } else {
    return <span dangerouslySetInnerHTML={{ __html: iconName }}></span>
  }
}
