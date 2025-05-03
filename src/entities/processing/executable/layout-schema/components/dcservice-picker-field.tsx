/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect } from 'react'

import { Dcservice } from '~/entities/database-container'
import { useField } from '~/shared/form'
import { Components } from '~/slices/layout-schema'
import { fns } from '~/utils/core'

import { type ComponentProps } from '../types'
import { type UseFieldProps, useFieldProps } from './lib.use-field'

// eslint-disable-next-line react-refresh/only-export-components
export const binding = [Components.syncFieldStatesBinding, Components.savePropToLocalStorage]

export type Props = Dcservice.Picker.PickerProps &
  Dcservice.Input.InputProps &
  ComponentProps &
  UseFieldProps<Dcservice.DcserviceDisplay> & {
    onValueChange: (value: string | undefined) => void
    localStorageKey?: string | undefined
  }

const NAME = 'dnp-processing-executables-layoutSchema-components-dcservicePickerField'

function Component(props: Props): React.ReactNode {
  const {
    className,
    // label,
    value,
    propsState,
    fieldName,
    context,
    block,
    setProps,
    parse,
    format,
    localStorageKey,
    ...inputProps
  } = props

  const fieldProps = useFieldProps<string>(props as any)

  const { input } = useField(fieldName)

  return (
    <Dcservice.Picker.default
      {...fieldProps}
      enabled={!fieldProps.disabled}
      fetchDisplay={async (params) => {
        if (!params.id) return undefined
        return Dcservice.api.getById.request({ id: params.id }).then((r) => r.data)
      }}
      fetcherDependencies={[fieldProps.disabled]}
      fetchList={async (params) => {
        const ret = await Dcservice.api.findWithTotal.request({
          take: params.limit,
          skip: (params.page - 1) * params.limit,
        })
        return ret.data
      }}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      renderTrigger={useCallback(({ enabled, setIsOpen, value, setValue }) => {
        return (
          <Dcservice.Input.default
            {...inputProps}
            hasValue={!!value}
            disabled={!enabled}
            onBlur={fns(inputProps.onBlur, input.onBlur)}
            onFocus={fns(inputProps.onFocus, input.onFocus)}
            fetchValue={async () => {
              if (!value) return undefined
              return Dcservice.api.getById.request({ id: value }).then((r) => r.data)
            }}
            fetcherDependencies={[value]}
            onClearableClick={() => setValue(undefined)}
            onClick={() => setIsOpen(true)}
          />
        )
      }, [])}
    />
  )
}

const DcservicePickerField = memo(Component)
DcservicePickerField.displayName = NAME
export default DcservicePickerField
