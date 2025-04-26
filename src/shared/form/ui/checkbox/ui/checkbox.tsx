import { useField } from 'react-final-form'

import type { CheckboxProps } from '~/shared/checkbox'
import Checkbox from '~/shared/checkbox'
import { c } from '~/utils/core'

export interface Props extends Omit<CheckboxProps, 'name'> {
  name: string
}

const NAME = 'ui-form-Checkbox'

export default function Component(props: Props): JSX.Element {
  const { className, name, ...checkboxProps } = props

  const field = useField(name, { type: 'checkbox' })

  return (
    <Checkbox
      {...field.input}
      {...checkboxProps}
      // функция onChange в типе есть но она не тригерится поэтому передаем в onCheckedChange
      onCheckedChange={field.input.onChange}
      className={c(className, NAME)}
      type={undefined}
    />
  )
}
Component.displayName = NAME
