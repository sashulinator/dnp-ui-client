import { c } from '~/utils/core'
import { setPath, walk } from '~/utils/dictionary'

import Checkbox, { type CheckboxProps } from './checkbox'

export type Props<T extends Record<string, unknown>> = CheckboxProps & {
  treeChecked: T
  onTreeCheckedChange: (treeChecked: T) => void
}

const NAME = 'dnp-sh-Checkbox-v-Tree'

export default function Component<T extends Record<string, unknown>>(props: Props<T>): JSX.Element {
  const { treeChecked, onTreeCheckedChange, ...checkboxProps } = props

  return (
    <Checkbox
      className={c()}
      {...checkboxProps}
      checked={calculateChecked()}
      onCheckedChange={(checked) => {
        if (checked === 'indeterminate') return
        let newValue = {}
        walk(treeChecked, ({ path, value }) => {
          if (typeof value !== 'boolean') return
          newValue = setPath(newValue, path, checked)
        })
        onTreeCheckedChange(newValue as T)
      }}
    />
  )

  function calculateChecked() {
    const flatValue: Record<string, boolean> = {}

    walk(treeChecked, ({ path, value }) => {
      if (typeof value !== 'boolean') return
      flatValue[path.join('.')] = value
    })

    const actionsValuesArr = Object.entries(flatValue)
    const selectedActionsValuesArr = actionsValuesArr.filter(([, value]) => value)

    return selectedActionsValuesArr.length === actionsValuesArr.length
      ? true
      : selectedActionsValuesArr.length === 0
        ? false
        : 'indeterminate'
  }
}

Component.displayName = NAME

export { type Props as TreeCheckboxProps }
