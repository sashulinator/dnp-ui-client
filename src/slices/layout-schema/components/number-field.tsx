import { memo } from 'react'

import { syncFieldStatesBinding } from './lib.sync-field-states-binding'
import TextInputField, { type Props as TextInputFieldProps } from './text-field'

// eslint-disable-next-line react-refresh/only-export-components
export const bindings = [syncFieldStatesBinding]

export type Props = TextInputFieldProps & {
  context: { isSingleMode: boolean }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-layoutSchema-numberInputField'

function Component(props: Props): React.ReactNode {
  return (
    <TextInputField
      {...props}
      onValueChange={(value) => {
        const formatted = value?.toString()?.replace(/,/g, '.')
        const number = parseFloat(formatted || '')
        const isParsed = number?.toString() === formatted?.toString()
        props.onValueChange?.((isParsed ? number : formatted) as string)
      }}
      type='number'
    />
  )
}

const NumberField = memo(Component)
NumberField.displayName = NAME
export default NumberField
