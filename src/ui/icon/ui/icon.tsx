import React from 'react'
import ArrowLeft from '../widgets/arrow-left'
import ArrowRight from '../widgets/arrow-right'
import ChevronDown from '../widgets/chevron-down'
import ChevronLeft from '../widgets/chevron-left'
import ChevronRight from '../widgets/chevron-right'
import ChevronUp from '../widgets/chevron-up'
import Plus from '../widgets/plus'
import Trash from '../widgets/trash'

const iconNames = {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  Trash,
} satisfies Record<string, React.FC<React.SVGAttributes<SVGSVGElement>>>

export interface Props extends React.SVGAttributes<SVGSVGElement> {
  name: keyof typeof iconNames
}

export const NAME = 'ui-Icon'

/**
 * ui-Icon
 */
export default function Component(props: Props): JSX.Element {
  const { name, ...svgProps } = props
  return React.createElement(iconNames[name], svgProps)
}

Component.displayName = NAME
