import { useEffect, useMemo } from 'react'

import { useField, useForm } from '~/shared/form'
import LayoutSchema, { propToFunction } from '~/slices/layout-schema'

import { componentMap } from '../../layout-schema/constants'
import { type ParamFactoryContext } from '../models'

export interface Props {
  className?: string | undefined
  _paramContext: ParamFactoryContext
  value: unknown
  onChange: (value: unknown) => void
}

const NAME = 'dnp-processing-executables-layoutSchema'

export default function Component(props: Props): JSX.Element {
  const { _paramContext, onChange } = props

  const fieldName = _paramContext.name
  const rootBlock = (props._paramContext.paramSchema.component?.props as any).rootBlock

  const deserializedRootBlock = useMemo(() => propToFunction(rootBlock), [rootBlock])

  const field = useField(fieldName, { subscription: { value: true } })
  const form = useForm()

  useEffect(() => {
    setTimeout(() => onChange(field.input.value))
  }, [field.input.value])

  return (
    <LayoutSchema
      context={useMemo(
        () => ({
          parentFieldName: fieldName,
          isSingleMode: _paramContext.isSingleMode,
          columns: _paramContext.columns,
          form,
        }),
        [],
      )}
      componentMap={componentMap}
      rootBlock={deserializedRootBlock}
    />
  )
}

Component.displayName = NAME
