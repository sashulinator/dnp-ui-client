import './text-highlighter.scss'
import Text, { TextProps } from '~/ui/text'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'

export type Props = TextProps & {
  tooltipContent?: string | undefined
}

const displayName = 'ui-TextHighlighter'

/**
 * ui-Text
 */
export default function Component(props: Props): JSX.Element {
  const { tooltipContent, ...textProps } = props

  const text = <Text {...textProps} className={c(props.className, displayName)} />

  return tooltipContent ? <Tooltip content={tooltipContent}>{text}</Tooltip> : text
}

Component.displayName = displayName
