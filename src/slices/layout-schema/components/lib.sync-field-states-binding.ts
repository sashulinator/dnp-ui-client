import { type FormApi, getIn } from '~/shared/form'
import { assertDefined } from '~/utils/core'
import type { Atom } from '~/utils/store'

import type { Binding, ComponentProps } from '../types'

export const syncFieldStatesBinding = {
  id: 'syncFieldStates',
  fn(componentProps: ComponentProps): void {
    const context = componentProps.context as { form: FormApi }
    const propsState = componentProps.propsState as unknown as Atom<{
      value: unknown
      fieldName: string
      onValueChange: (value: unknown) => void
    }>

    const errMsg = `Отсутствует свойство "fieldName" в блоке ${componentProps.block.id}`

    assertDefined(propsState.get().fieldName, errMsg)

    context.form.registerField(
      propsState.get().fieldName,
      ({ value }) => {
        const props = propsState.get()
        if (value === props.value) return
        componentProps.setProps({ ...props, value })
      },
      { value: true },
    )

    context.form.getState()

    propsState.subscribe((newProps) => {
      const formValue = getIn(context.form.getState().values, newProps.fieldName)
      if (newProps.value === formValue) return
      context.form.change(newProps.fieldName, newProps.value)
    })
  },
} satisfies Binding
