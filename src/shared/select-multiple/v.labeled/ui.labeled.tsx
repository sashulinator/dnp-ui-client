import Flex from '~/shared/flex'
import Labeled, { type LabeledProps as SharedLabeledProps } from '~/shared/labeled'
import { c } from '~/utils/core'

import SelectInput, {
  type Option as InputOption,
  NAME as PARENT_NAME,
  type Props as SelectMultipleProps,
} from '../ui.select-multiple'

export type Option = InputOption

export type Props = Omit<SelectMultipleProps, 'type'> & {
  className?: string | undefined
  label?: React.ReactNode
  labeldProps?: SharedLabeledProps | undefined
  children?: React.ReactNode
}

const NAME = `${PARENT_NAME}-v-Labeled`

export default function Component(props: Props): JSX.Element {
  const { children, label, className, ...textInputProps } = props

  return (
    <Flex width='100%' direction='column' className={c(className, NAME)}>
      <Labeled label={label}>
        <SelectInput {...textInputProps} className={c(props.className, NAME)} />
      </Labeled>
      {children}
    </Flex>
  )
}

Component.displayName = NAME

export { type Props as LabeledProps }
