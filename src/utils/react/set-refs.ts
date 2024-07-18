import type { Ref } from 'react'

/**
 * Устанавливает значение нескольким ref'ам
 *
 * Проблематика:
 * 1. Нет универсального способа установки нескольких ref'ов
 * 2. Тип передаваемого ref'а не должен быть у́же получаемого
 * 3. Может привести к ошибке если мы ожидаем получить ref расширенного типа
 *    @exapmle
 *    const ref = useRef<HTMLInputElement>(null)
 *    // Здесь хотелось бы иметь ошибку ведь мы ожидаем input а получим div
 *    //           ↓
 *    return <div ref={ref} />
 *
 *    Почему это происходит?
 *    Используя функции мы в 99.9% случаях спускаем данные
 *    вниз в функцию, в случае с ref же, мы пытаемся получить
 *    данные ИЗ функции
 *
 * @param refs
 * @example
 * <div ref={setRefs(ref, divRef)} />
 */
export function setRefs<T, I extends T>(...refs: (Ref<T> | undefined)[]): (instance: I | null) => void {
  return (instance) => {
    refs.forEach((someRef) => setRef(instance, someRef))
  }
}

export function setRef<T, I extends T>(instance: I | null, ref: Ref<T> | undefined) {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(instance)
  } else {
    ;(ref as any).current = instance
  }
}
