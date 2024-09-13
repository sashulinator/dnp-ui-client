import Text, { TextProps } from '~/shared/text'
import { c } from '~/utils/core'

export type Props = TextProps & {
  content: React.ReactNode
}

export const NAME = 'ui-Form-w-Label'

/**
 * ui-Form-w-Label
 */
export default function Component(props: Props): JSX.Element {
  const { className, content, ...textProps } = props
  return (
    <Text as='label' style={{ color: 'var(--accent-11)' }} size='1' {...textProps} className={c(className, NAME)}>
      {content}
    </Text>
  )
}

Component.displayName = NAME
