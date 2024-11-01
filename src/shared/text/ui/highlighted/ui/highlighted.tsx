import './highlighted.scss'

import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

import Text, { type TextProps } from '../../text'

export type Props = TextProps & {
  tooltipContent?: string | undefined
}

Component.displayName = 'dnp-text-Highlighted'

export default function Component(props: Props): JSX.Element {
  const { tooltipContent, ...textProps } = props

  const text = <Text {...textProps} className={c(props.className, Component.displayName)} />

  return tooltipContent ? <Tooltip content={tooltipContent}>{text}</Tooltip> : text
}
