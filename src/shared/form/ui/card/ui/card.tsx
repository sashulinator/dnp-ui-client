import { type ReactNode } from 'react'

import Card, { type CardProps } from '~/shared/card'
import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { c } from '~/utils/core'

export type Props = CardProps & {
  label?: ReactNode
}

export const NAME = 'ui-Form-w-Card'

/**
 * ui-Form-w-Card'
 */
export default function Component(props: Props): JSX.Element {
  const { label, children, ...cardProps } = props

  return (
    <Flex asChild={true} pt={label ? '2' : '6'} pb='6' pl='6' pr='6'>
      <Card {...cardProps} className={c(props.className, NAME)}>
        <Text style={{ textTransform: 'uppercase', opacity: '0.5' }} size='1' color='gray'>
          {label}
        </Text>
        {children}
      </Card>
    </Flex>
  )
}

Component.displayName = NAME
