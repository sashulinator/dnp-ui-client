import { cloneElement, useId } from 'react'

import Text, { type TextProps } from '~/shared/text'
import { c } from '~/utils/core'

export type Props = TextProps & {
  className?: string | undefined
  children: React.ReactElement
  lable?: React.ReactNode
}

const NAME = 'labled-Labled'

export default function Component(props: Props): JSX.Element {
  const { className, children, lable, ...textProps } = props

  if (!lable) return children

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id = useId()
  const labelProps = { htmlFor: id } // напрямую ТС выбрасывает "нет htmlFor проперти"

  return (
    <>
      <Text
        as='label'
        style={{ color: 'var(--accent-11)' }}
        size='1'
        {...labelProps}
        {...textProps}
        className={c(className, NAME)}
      >
        {lable}
      </Text>
      {cloneElement(children, { ...children.props, id })}
    </>
  )
}

Component.displayName = NAME

export { type Props as LabledProps }
