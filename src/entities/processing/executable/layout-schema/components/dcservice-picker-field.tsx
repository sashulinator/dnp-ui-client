/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect } from 'react'

import { Dcservice } from '~/entities/database-container'
import Flex from '~/shared/flex'
import { useField } from '~/shared/form'
import Labeled from '~/shared/labeled'
import { Components } from '~/slices/layout-schema'
import { fns } from '~/utils/core'

import { type ComponentProps } from '../types'
import { type UseFieldProps, useFieldProps } from './lib.use-field'

export const binding = [Components.syncFieldStatesBinding, Components.savePropToLocalStorage]

export type Props = Dcservice.Picker.PickerProps &
  Dcservice.Input.InputProps &
  ComponentProps &
  UseFieldProps<Dcservice.DcserviceDisplay> & {
    onValueChange: (value: { id: string | undefined } | undefined) => void
    label: string
  }

const NAME = 'dnp-processing-executables-layoutSchema-components-dcservicePickerField'

function Component(props: Props): React.ReactNode {
  const {
    className,
    value,
    label,
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

  const fieldProps = useFieldProps<{ id: string }>(props as any)

  const { input } = useField(fieldName)

  return (
    <Dcservice.Picker.default
      {...fieldProps}
      enabled={!fieldProps.disabled}
      fetchDisplay={() => fetchDisplay({ id: value?.id })}
      fetcherDependencies={[fieldProps.disabled]}
      fetchList={fetchList}
      renderTrigger={({ enabled, setIsOpen, value, setValue }) => {
        return (
          <Flex width='100%' direction='column'>
            <Labeled label={label}>
              <Dcservice.Input.default
                {...inputProps}
                hasValue={!!value}
                disabled={!enabled}
                onBlur={fns(inputProps.onBlur, input.onBlur)}
                onFocus={fns(inputProps.onFocus, input.onFocus)}
                fetchDisplay={() => fetchDisplay({ id: value?.id })}
                fetcherDependencies={[value]}
                onClearableClick={() => setValue(undefined)}
                onClick={() => setIsOpen(true)}
              />
            </Labeled>
          </Flex>
        )
      }}
    />
  )

  // Private

  async function fetchDisplay(params: { id: string | undefined }): Promise<undefined | Dcservice.api.getById.Result> {
    if (!params.id) return undefined
    return Dcservice.api.getById.request({ id: params.id }).then((r) => r.data)
  }

  async function fetchList(params: {
    sort: Dcservice.Picker.ItemSort | undefined
    searchFilter: Dcservice.Picker.ItemSearchFilter | undefined
    page: number
    limit: number
  }) {
    const ret = await Dcservice.api.findWithTotal.request({
      take: params.limit,
      skip: (params.page - 1) * params.limit,
    })
    return ret.data
  }
}

const DcservicePickerField = memo(Component)
DcservicePickerField.displayName = NAME
export default DcservicePickerField
