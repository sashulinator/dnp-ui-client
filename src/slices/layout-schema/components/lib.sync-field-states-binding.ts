import { type FormApi, getIn } from '~/shared/form'
import { assertDefined, has } from '~/utils/core'
import type { Atom } from '~/utils/store'

import type { Binding, ComponentProps } from '../types'

export const syncFieldStatesBinding = {
  id: 'syncFieldStates',
  fn(componentProps: ComponentProps): void {
    const context = componentProps.context as { form: FormApi; parentFieldName: string }
    const propsState = componentProps.propsState as unknown as Atom<{
      value: unknown
      fieldName: string
      onValueChange: (value: unknown) => void
    }>

    const fieldName = context.parentFieldName
      ? `${context.parentFieldName}.${propsState.get().fieldName}`
      : propsState.get().fieldName

    // Валидируем наличие обязательных пропсов
    const errMsg = `Отсутствует свойство "fieldName" в блоке ${componentProps.block.id}`
    assertDefined(propsState.get().fieldName, errMsg)

    // Если в стейте формы есть значения то берем их и сетаем в пропсы
    const formValues = context.form.getState()?.values
    if (has(formValues, propsState.get().fieldName)) {
      propsState.set({ ...propsState.get(), value: getIn(formValues, propsState.get().fieldName) })
    }

    context.form.registerField(
      fieldName,
      ({ value }) => {
        // console.log('fieldSub', propsState.get().fieldName, value)
        if (value === undefined) return
        const props = propsState.get()
        if (value === props.value) return
        componentProps.setProps({ ...props, value })
      },
      { value: true },
    )

    propsState.subscribe((newProps) => {
      const formValue = getIn(context.form.getState().values, newProps.fieldName)
      if (newProps.value === formValue) return
      // console.log('propsSub', propsState.get().fieldName, newProps.value)
      context.form.change(fieldName, newProps.value)
    })
  },
} satisfies Binding
