import type { TextProps } from '~/shared/text'
import Text from '~/shared/text'
import { c } from '~/utils/core'

export type Props = TextProps & {
  content?: null | string | number | undefined | React.ReactElement
}

export const NAME = 'ui-Form-w-Label'

/**
 * ui-Form-w-Label
 */
export default function Component(props: Props): JSX.Element {
  const { className, content, ...textProps } = props
  return (
    <Text as='label' style={{ color: 'var(--accent-11)' }} size='1' {...textProps} className={c(className, NAME)}>
      {content || textProps.children}
    </Text>
  )
}

Component.displayName = NAME
