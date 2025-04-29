import { memo } from 'react'

import TextInputField, { type Props as TextInputFieldProps } from './text-input-field'

export type Props = TextInputFieldProps & {
  context: { isSingleMode: boolean }
  // Десейблить при singleMode
  isSingleModeDisabled?: boolean | undefined
  // Десейблить при multiMode
  isMultiModeDisabled?: boolean | undefined
}

const NAME = 'dnp-layoutSchema-numberInputField'

const NumberInputField = memo((props: Props): React.ReactNode => {
  return (
    <TextInputField
      {...props}
      parse={(value) => {
        const formatted = value?.toString()?.replace(/,/g, '.')
        const number = parseFloat(formatted)
        const isParsed = number?.toString() === formatted?.toString()
        return (isParsed ? number : formatted) as string
      }}
      type='number'
    />
  )
})
export default NumberInputField

NumberInputField.displayName = NAME
