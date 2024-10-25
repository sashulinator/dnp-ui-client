import type { TextProps } from '~dnp/shared/text'
import Text from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

export type Props = TextProps & {
  children?: null | string | number | undefined | React.ReactElement
}

export const NAME = 'ui-Form-w-Label'

/**
 * ui-Form-w-Label
 */
export default function Component(props: Props): JSX.Element {
  const { className, children, ...textProps } = props
  return (
    <Text as='label' style={{ color: 'var(--accent-11)' }} size='1' {...textProps} className={c(className, NAME)}>
      {children}
    </Text>
  )
}

Component.displayName = NAME
