import React from 'react'

import Flex from '~/shared/flex'
import type { Union } from '~/utils/types/union'

import type { IconName } from '../constants/map'
import { map } from '../constants/map'

export interface Props extends Omit<React.SVGAttributes<SVGSVGElement>, 'name'> {
  name: Union<string, keyof typeof map>
}

export const NAME = 'ui-Icon'

/**
 * ui-Icon
 */

export default function Component(props: Props): JSX.Element {
  const { name, ...svgProps } = props
  if (name.toString() in map) {
    return React.createElement(map[name as IconName], svgProps)
  } else {
    return <Flex as='span' width='fit-content' height='fit-content' dangerouslySetInnerHTML={{ __html: name }}></Flex>
  }
}

Component.displayName = NAME
