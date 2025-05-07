import { useMemo, useRef } from 'react'

import { Dcservice } from '~/entities/database-container'
import { useCreateForm } from '~/shared/form'
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
  const { _paramContext, value, onChange } = props
  const isInit = useRef(true)
  // const fieldName = _paramContext.name
  const rootBlock = (props._paramContext.paramSchema.component?.props as any).rootBlock

  const deserializedRootBlock = useMemo(() => propToFunction(rootBlock), [rootBlock])

  // const field = useField(fieldName, { subscription: { value: true } })
  const form = useCreateForm({ onSubmit: () => {}, initialValues: value as any })

  const context = useMemo(
    () => ({
      // parentFieldName: fieldName,
      isSingleMode: _paramContext.isSingleMode,
      columns: _paramContext.columns,
      api: {
        dcservice: Dcservice.api,
      },
      form,
    }),
    [],
  )

  return (
    <LayoutSchema
      context={context}
      bindings={useMemo(
        () => [
          (componentProps) => {
            if (!(componentProps.block.props as any).fieldName) return
            componentProps.propsState.subscribe((v) => {
              // Первый рендеринг
              if (!props._paramContext.isSingleMode && isInit.current) {
                if (!value) {
                  // @ts-ignore
                  onChange({ ...form.getState().values, [componentProps.block.props.fieldName]: v.value })
                }
                setTimeout(() => {
                  isInit.current = false
                }, 10)
                return
              }

              if (props._paramContext.isSingleMode) {
                // @ts-ignore
                onChange({ ...form.getState().values, [componentProps.block.props.fieldName]: v.value })
              } else {
                // @ts-ignore
                onChange({ [componentProps.block.props.fieldName]: v.value })
              }
            })
          },
        ],
        [],
      )}
      componentMap={componentMap}
      rootBlock={deserializedRootBlock}
    />
  )
}

Component.displayName = NAME
