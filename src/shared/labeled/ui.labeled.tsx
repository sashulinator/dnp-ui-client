import { cloneElement, useId } from 'react'

import Text, { type TextProps } from '~/shared/text'
import { c } from '~/utils/core'

export type Props = TextProps & {
  className?: string | undefined
  children: React.ReactElement
  label?: React.ReactNode
}

const NAME = 'labled-Labeled'

export default function Component(props: Props): JSX.Element {
  const { className, children, label, ...textProps } = props

  if (!label) return children

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
        {label}
      </Text>
      {cloneElement(children, { ...children.props, id })}
    </>
  )
}

Component.displayName = NAME

export { type Props as LabeledProps }
