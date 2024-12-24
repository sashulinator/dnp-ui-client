import type { Any } from '~/utils/core'
import type { Union } from '~/utils/types/union'

import NumberInput, { type NumberInputProps } from '../number-input'
import TextInput, { type TextInputProps } from '../text-input'

export type Props<T extends Union<string, 'text' | 'number'> = 'text'> = T extends 'number'
  ? NumberInputProps
  : TextInputProps & {
      type: T
    }

const NAME = 'input-Input'

export default function Component<T extends 'text' | 'number'>(props: Props<T>): JSX.Element {
  if (props.type === 'number') {
    return <NumberInput {...(props as Any)} />
  } else {
    return <TextInput {...(props as Any)} />
  }
}

Component.displayName = NAME
