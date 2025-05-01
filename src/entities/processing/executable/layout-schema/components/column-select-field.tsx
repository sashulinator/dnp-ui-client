import { memo, useMemo } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Tooltip from '~/shared/tooltip'

import type { UseFieldProps } from './lib.use-field'
import SelectField, { type Props as SelectFieldProps } from './select-field'
import TextInputField from './text-field'

export type Props = SelectFieldProps &
  UseFieldProps<string> & {
    allowTextInput: boolean
    isTextInputMode: boolean
  }

const NAME = 'dnp-processing-executables-layoutSchema-components-columnSelectField'

function Component(props: Props): React.ReactNode {
  const { allowTextInput, size = '2', isTextInputMode, ...restProps } = props

  const options = useMemo(
    () =>
      props.context.columns.map((c) => ({
        value: c.name,
        display: c.name,
      })),
    [props.context.columns],
  )

  return (
    <Flex width='100%' gap='2' align='end'>
      {isTextInputMode ? (
        <TextInputField size={size} {...(restProps as any)} />
      ) : (
        <SelectField size={size} {...restProps} options={options} />
      )}
      {allowTextInput && (
        <Tooltip
          content={
            isTextInputMode
              ? props.input.value
                ? 'Очистите поле ввода чтобы сменить тип ввода на "Выбор из существующих'
                : 'Выбрать из существующих'
              : 'Ввести название вручную'
          }
        >
          <Button
            variant='outline'
            square={true}
            size={size}
            onClick={() => {
              props.setProps({ isTextInputMode: !isTextInputMode } as any)
              props.input.onChange('')
            }}
          >
            <Icon name={isTextInputMode ? 'ChevronDown' : 'Pencil'} />
          </Button>
        </Tooltip>
      )}
    </Flex>
  )
}

const ColumnSelectField = memo(Component)
ColumnSelectField.displayName = NAME
export default ColumnSelectField

ColumnSelectField.displayName = NAME
