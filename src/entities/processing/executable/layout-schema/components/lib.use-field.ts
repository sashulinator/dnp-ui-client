import { Params } from '~/utils/string-storage'

import { type ComponentProps, type Context } from '../types'

export type UseFieldProps<TValue> = ComponentProps<{
  value: TValue | undefined
  onValueChange?: ((v: TValue | undefined) => void) | undefined
}> &
  Context & {
    // Десейблить при singleMode
    isSingleModeDisabled?: boolean | undefined
    // Десейблить при multiMode
    isMultiModeDisabled?: boolean | undefined
    disabled?: boolean | undefined
    fieldName: string
    localStorage?: {
      key: string | undefined
      type: keyof typeof PARAMS_MAP
    }
  }

const PARAMS_MAP = {
  object: Params.ObjectParam,
  string: Params.StringParam,
  number: Params.NumberParam,
}

export function useFieldProps<TValue>(props: UseFieldProps<TValue>) {
  const {
    isSingleModeDisabled,
    setProps,
    onValueChange = defaultOnValueChange,
    disabled,
    fieldName,
    isMultiModeDisabled,
    context,
    value,
    ...restProps
  } = props

  // const [localStorageValue, setLocalStorageValue] = useStringStorage<TValue>(
  //   useLocalStorage({ key: localStorage?.key }),
  //   new PARAMS_MAP[localStorage?.type || 'string']() as any,
  // )

  // useEffect(() => {
  //   if (!localStorageValue) return
  //   setProps({ value: localStorageValue })
  // }, [])

  const isSingleDisabled = isSingleModeDisabled && context.isSingleMode
  const multiModeDisabled = isMultiModeDisabled && !context.isSingleMode
  const isDisabled = disabled || isSingleDisabled || multiModeDisabled

  const retFieldName = context.parentFieldName ? `${context.parentFieldName}.${fieldName}` : fieldName

  const placeholder = isSingleDisabled
    ? 'Только массовая настройка'
    : multiModeDisabled
      ? 'Только потабличная настройка'
      : ''

  return {
    ...restProps,
    value,
    disabled: isDisabled,
    placeholder,
    setProps,
    fieldName: retFieldName,
    onValueChange,
  }

  // Private

  function defaultOnValueChange(value: TValue | undefined) {
    setProps({ value })
  }
}
