/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect } from 'react'

import { Dcservice } from '~/entities/database-container'
import { useField } from '~/shared/form'
import { useSyncStates } from '~/utils/hooks/sync-states'

import { type ComponentProps } from '../types'
import { type UseFieldProps, useFieldProps } from './lib.use-field'

export type Props = Dcservice.Picker.PickerProps &
  ComponentProps &
  UseFieldProps<Dcservice.DcserviceValue> & {
    onValueChange: (e: Dcservice.DcserviceValue | undefined) => void
    localStorageKey?: string | undefined
  }

const NAME = 'dnp-processing-executables-layoutSchema-components-dcservicePickerField'

function Component(props: Props): React.ReactNode {
  const {
    className,
    // label,
    value,
    fieldName,
    onValueChange,
    context,
    block,
    setProps,
    localStorageKey,
    ...restProps
  } = props

  const fieldProps = useFieldProps<Dcservice.DcserviceValue>(props)

  const { input } = useField(fieldName)
  useSyncStates([input.value, (v) => input.onChange(v), input.value], [value, (v) => setProps?.({ value: v })])

  return (
    <Dcservice.Picker.default
      {...fieldProps}
      enabled={!fieldProps.disabled}
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
            hasValue={!!value}
            disabled={!enabled}
            fetchValue={() => value}
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
