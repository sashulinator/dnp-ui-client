import { useEffect, useMemo } from 'react'

import { useField } from '~/shared/form'
import LayoutSchema, { propToFunction } from '~/slices/schema-factory'

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

  useEffect(() => {
    setTimeout(() => onChange(field.input.value))
  }, [field.input.value])

  return (
    <LayoutSchema
      context={{
        parentFieldName: fieldName,
        isSingleMode: _paramContext.isSingleMode,
        columns: _paramContext.columns,
      }}
      componentMap={componentMap}
      rootBlock={deserializedRootBlock}
    />
  )
}

Component.displayName = NAME
