/**
 * ui
 */
import HighlightedText from './ui/highlighted'
import Text from './ui/text'

export default Text
export type { TextProps } from './ui/text'

export { HighlightedText }
export type { HighlightedProps as HighlightedTextProps } from './ui/highlighted'

/**
 * widgets
 */
export { default as TextOverflow, type OverflowProps as TextOverflowProps } from './overflow'
