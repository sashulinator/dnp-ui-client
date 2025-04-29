import { useCallback, useEffect, useMemo } from 'react'

import Form, { getIn, useCreateForm } from '~/shared/form'
import LayoutSchema, { propToFunction } from '~/slices/schema-factory'

import { type ParamFactoryContext } from '../models'
import { componentMap } from './constants'

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

  const form = useCreateForm(
    {
      onSubmit: () => {
        //
      },
      // mutators: { ...arrayMutators },
    },
    { values: true },
  )

  useEffect(() => {
    form.subscribe(
      (state) => {
        onChange(getIn(state.values, `${fieldName.split('.<flat>')[0]}.<flat>`))
      },
      { values: true },
    )
  }, [])

  return (
    <Form
      form={form}
      component={useCallback(
        (): JSX.Element => (
          <LayoutSchema
            context={{
              parentFieldName: fieldName,
              isSingleMode: _paramContext.isSingleMode,
              columns: _paramContext.columns,
            }}
            componentMap={componentMap}
            rootBlock={deserializedRootBlock}
          />
        ),
        [],
      )}
    />
  )
}

Component.displayName = NAME
