import { type FormApi, getIn } from '~/shared/form'
import type { Atom } from '~/utils/store'

import type { ComponentProps } from '../types'

export function syncFieldStatesBinding(componentProps: ComponentProps) {
  const context = componentProps.context as { form: FormApi }
  const propsState = componentProps.propsState as unknown as Atom<{
    value: unknown
    fieldName: string
    onValueChange: (value: unknown) => void
  }>

  context.form.registerField(
    propsState.get().fieldName,
    ({ value }) => {
      const props = propsState.get()
      if (value === props.value) return
      componentProps.setProps({ ...props, value })
    },
    { value: true },
    { initialValue: propsState.get().value },
  )

  propsState.subscribe((newProps) => {
    const formValue = getIn(context.form.getState().values, newProps.fieldName)
    if (newProps.value === formValue) return
    context.form.change(newProps.fieldName, newProps.value)
  })
}
