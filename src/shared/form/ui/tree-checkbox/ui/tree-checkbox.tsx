import { useField } from 'react-final-form'

import type { CheckboxProps } from '~/shared/checkbox'
import { TreeCheckbox } from '~/shared/checkbox'
import { c } from '~/utils/core'

export interface Props extends Omit<CheckboxProps, 'name'> {
  name: string
}

const NAME = 'dnp-sh-form-TreeCheckbox'

export default function Component(props: Props): JSX.Element {
  const { className, name, ...checkboxProps } = props

  const field = useField(name)

  return (
    <TreeCheckbox
      {...field.input}
      {...checkboxProps}
      treeChecked={field.input.value}
      onTreeCheckedChange={field.input.onChange}
      className={c(className, NAME)}
      type={undefined}
    />
  )
}
Component.displayName = NAME
